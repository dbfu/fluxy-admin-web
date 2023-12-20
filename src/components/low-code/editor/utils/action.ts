import {Modal, message} from 'antd';
import axios from 'axios';
import {get} from 'lodash-es';
import {Node} from '../layouts/flow-event/data';
import {getComponentRef} from '../stores/component-ref';
import {usePageDataStore} from '../stores/page-data';

function getData(key: string) {
  return usePageDataStore.getState().data[key];
}

function setData(key: string, value: any) {
  usePageDataStore.getState().setData(key, value);
}

export function execEventFlow(
  nodes: Node[] = [],
  eventData?: any,
  initEventData?: any
) {
  if (!nodes.length) return;

  nodes.forEach(async (item: Node) => {
    // 判断是否是动作节点，如果是动作节点并且条件结果不为false，则执行动作
    if (item.type === 'action' && item.conditionResult !== false) {
      // 根据不同动作类型执行不同动作
      await eventHandleMap[item.config.type](
        item,
        item.config.config,
        eventData,
        initEventData
      );
    } else if (item.type === 'condition') {
      // 如果是条件节点，执行条件脚本，把结果注入到子节点conditionResult属性中
      const conditionResult = (item.config || []).reduce(
        (prev: any, cur: any) => {
          const result = execScript(cur.condition, eventData, initEventData);
          prev[cur.id] = result;
          return prev;
        },
        {}
      );

      (item.children || []).forEach((c: any) => {
        c.conditionResult = !!conditionResult[c.conditionId];
      });
      // 递归执行子节点事件流
      execEventFlow(item.children, null, initEventData);
    } else if (item.type === 'event') {
      // 如果是事件节点，执行事件子节点事件流
      execEventFlow(item.children, null, initEventData);
    }
  });
}

async function confirmHandle(
  item: any,
  actionConfig: any,
  _: any,
  initEventData: any
) {
  const {text} = actionConfig || {};
  Modal.confirm({
    title: '提示',
    content: text,
    zIndex: 100000,
    onOk: () => {
      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'confirm');
      execEventFlow(nodes, null, initEventData);
    },
    onCancel: () => {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'cancel');
      execEventFlow(nodes, null, initEventData);
    },
  });
}

// 请求数据
async function requestHandle(
  item: any,
  actionConfig: any,
  eventData: any,
  initEventData: any
) {
  const {url, method, params = [], body = []} = actionConfig || {};

  try {
    // 解析代码里的变量
    const paramsValue = params.reduce((prev: any, cur: any) => {
      prev[cur.key] = cur.value.replace(
        /\{(.+)\}/g,
        (_: string, $2: string) => {
          return get(
            {
              eventData,
              initEventData,
              data: usePageDataStore.getState().data,
            },
            $2
          );
        }
      );
      return prev;
    }, {});

    let bodyValue;

    if (body && body.type === 'script' && body.script) {
      bodyValue = execScript(body.script, eventData, initEventData);
    } else if (body && body.type === 'json' && body.json) {
      bodyValue = JSON.parse(body.json);
    }

    const res = await axios({
      url,
      method,
      params: paramsValue,
      data: bodyValue,
    });

    // 执行成功后，执行后续成功success事件
    const nodes = item.children?.filter((o: any) => o.eventKey === 'success');
    execEventFlow(nodes, res.data, initEventData);
  } catch (error) {
    console.log(error, 'error');

    const nodes = item.children?.filter((o: any) => o.eventKey === 'error');
    execEventFlow(nodes);
  } finally {
    const nodes = item.children?.filter((o: any) => o.eventKey === 'finally');
    execEventFlow(nodes);
  }
}

// 执行脚本
async function execScriptHandle(
  item: any,
  actionConfig: any,
  eventData: any,
  initEventData: any
) {
  const {script} = actionConfig || {};

  if (script) {
    try {
      // 执行脚本
      execScript(script, eventData, initEventData);

      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'success');
      execEventFlow(nodes);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'error');
      execEventFlow(nodes);
    } finally {
      // 执行后续成功或失败finally事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'finally');
      execEventFlow(nodes);
    }
  }
}

// 设置变量
async function setVariableHandle(
  item: any,
  actionConfig: any,
  eventData: any,
  initEventData: any
) {
  const {variable, value} = actionConfig || {};

  if (variable && value) {
    try {
      if (/\{(.+)\}/.test(value)) {
        value.replace(/\{(.+)\}/g, (_: string, $2: string) => {
          const data = get(
            {
              eventData,
              initEventData,
              data: usePageDataStore.getState().data,
            },
            $2
          );
          setData(variable, data);
        });
      } else {
        // 变量设置
        setData(variable, value);
      }

      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'success');
      execEventFlow(nodes);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'error');
      execEventFlow(nodes);
    } finally {
      // 执行后续成功或失败finally事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'finally');
      execEventFlow(nodes);
    }
  }
}

// 组件方法
async function componentMethodHandle(
  item: any,
  actionConfig: any,
  eventData: any,
  initEventData: any
) {
  const {componentId, method} = actionConfig || {};

  if (componentId && actionConfig) {
    try {
      // 执行组件方法
      await getComponentRef(componentId)[method](eventData);

      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'success');
      execEventFlow(nodes, eventData, initEventData);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'error');
      execEventFlow(nodes, eventData, initEventData);
    } finally {
      // 执行后续成功或失败finally事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'finally');
      execEventFlow(nodes, eventData, initEventData);
    }
  }
}

// 显示提示
function showMessageHandle(item: any, actionConfig: any) {
  if (actionConfig?.type && actionConfig?.text) {
    try {
      if (actionConfig.type === 'success') {
        message.success(actionConfig.text);
      } else if (actionConfig.type === 'error') {
        message.error(actionConfig.text);
      }

      // 执行成功后，执行后续成功success事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'success');
      execEventFlow(nodes);
    } catch {
      // 执行失败后，执行后续error事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'error');
      execEventFlow(nodes);
    } finally {
      // 执行后续成功或失败finally事件
      const nodes = item.children?.filter((o: any) => o.eventKey === 'finally');
      execEventFlow(nodes);
    }
  }
}

// 执行脚本
function execScript(script: string, eventData: any, initEventData: any) {
  const func = new Function('ctx', `return ${script}`);

  const ctx = {setData, getComponentRef, getData, eventData, initEventData};
  return func(ctx);
}

const eventHandleMap: any = {
  ShowMessage: showMessageHandle,
  ComponentMethod: componentMethodHandle,
  SetVariable: setVariableHandle,
  ExecScript: execScriptHandle,
  Request: requestHandle,
  Confirm: confirmHandle,
};
