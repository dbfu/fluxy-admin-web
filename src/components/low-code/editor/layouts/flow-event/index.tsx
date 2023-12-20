import G6 from '@antv/g6';
import { Button, Drawer } from 'antd';
import { cloneDeep } from 'lodash-es';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ContextMenu from './context-menu';
import { data } from './data';
import { defaultLayout } from './default-layout';
import { registerLines } from './lines';
import { registerNodes } from './nodes/index';
import ActionSettingPanel from './setting-panel/action';
import ConditionSettingPanel from './setting-panel/condition';
import { getTreeDepth } from './utils';

registerNodes();
registerLines();

const settingMap: any = {
  action: ActionSettingPanel,
  condition: ConditionSettingPanel,
}

const EventFlowDesign = ({ flowData }: any, ref: any) => {

  const refContainer = useRef<any>();
  const graphRef = useRef<any>();
  const curModel = useRef<any>();
  const settingRef = useRef<any>();

  const [position, setPosition] = useState<any>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  useEffect(() => {
    if (!settingOpen) {
      curModel.current = null;
      setMenuOpen(false);
    }
  }, [settingOpen])

  useEffect(() => {
    const { width } = refContainer?.current?.getBoundingClientRect() || {};

    const depth = getTreeDepth(data);

    const graph = new G6.TreeGraph({
      container: refContainer.current,
      width,
      height: depth * 40 + 56 * (depth - 1) + 200,
      layout: defaultLayout,
      linkCenter: true,
      defaultNode: {
        type: 'start',
      },
      animateCfg: {
        duration: 150,
      },
    });

    graph.on('afteradditem', () => {
      const newData = graph.save();
      const depth = getTreeDepth(newData);
      graph.changeSize(width, depth * 40 + 56 * (depth - 1) + 200);
    })

    graph.on('afterremoveitem', () => {
      const newData = graph.save();
      const depth = getTreeDepth(newData);
      graph.changeSize(width, depth * 40 + 56 * (depth - 1) + 200);
    })

    graph.edge((config: any) => {
      // 获取线的源节点和目标节点
      const sourceNode: any = graph.findById(config.source);
      const targetNode: any = graph.findById(config.target);

      // 获取源节点和目标节点的配置
      const sourceModel = sourceNode?.getModel();
      const targetModel = targetNode?.getModel();

      let label = '';

      // 如果是条件节点，则取条件名称
      if (sourceModel?.type === 'condition') {
        const { name } = sourceModel?.config?.find((o: any) => o.id === targetModel?.conditionId) || {};
        label = name;
      }

      return {
        type: 'flow-line',
        label,
        style: {
          stroke: '#91d5ff',
        },
      } as any;
    });


    graph.data(cloneDeep(flowData || data));
    graph.render();
    graph.fitCenter();

    // 获取开始节点的位置
    const rootNodeBBox = graph.findById('root').getBBox();
    // 获取开始节点在画布上的位置
    const newBox = graph.getCanvasByPoint(rootNodeBBox.x, rootNodeBBox.y);
    // 移动画布到上边距为40的位置
    graph.translate(0, -newBox.y + 40);


    graphRef.current = graph;

    graph.on('node:click', (evt: any) => {
      const { item, target } = evt;
      const targetType = target.get('type');
      const name = target.get('name');
      const model = item.getModel();

      if (['action', 'condition'].includes(model.type) && targetType !== 'marker') {
        curModel.current = item.getModel();
        setSettingOpen(true);
        setMenuOpen(false);
        return;
      }

      if (model.id === curModel.current?.id) {
        return;
      }

      setMenuOpen(false);

      if (targetType === 'marker' && name === 'add-item') {
        // 获取当前节点的位置
        const itemBox = item.getBBox();
        // 获取当前节点的子节点位置
        const bbox = target.getBBox();
        // 获取当前节点在画布上的位置
        const newBox = graph.getCanvasByPoint(
          bbox.x + itemBox.x + itemBox.width / 2 + 20,
          bbox.y + itemBox.y + itemBox.height / 2 + 6
        );

        curModel.current = item.getModel();

        const { left, top } = refContainer?.current?.getBoundingClientRect() || {};

        setTimeout(() => {
          setPosition({
            top: newBox.y + top,
            left: newBox.x + left,
          });
          setMenuOpen(true);
        }, 10);
      } else if (name === 'remove-item') {
        graph.removeChild(model.id);
      }
    });


    graph.on('canvas:click', () => {
      setMenuOpen(false);
      curModel.current = null;
    });

    return () => {
      graph.destroy();
    };

  }, []);

  useImperativeHandle(ref, () => {
    return {
      save: () => {
        return graphRef.current?.save();
      }
    }
  }, [])

  const onSelect = ({ key }: any) => {
    const menu = curModel.current.menus?.find((o: any) => o.key === key);
    const type = menu.nodeType;
    const name = menu.nodeName;

    if (!curModel.current) return;

    const id = `n-${Math.random()}`;

    if (!curModel.current.children) {
      curModel.current.children = [];
    }

    let menus: any = [];

    if (['condition', 'action'].includes(type)) {
      menus = [];
    } else if (type === 'event') {
      menus = [
        {
          key: 'action',
          label: '动作',
          nodeType: 'action',
          nodeName: '动作',
          eventKey: menu.eventKey,
        },
        {
          key: 'condition',
          label: '条件',
          nodeType: 'condition',
          nodeName: '条件',
          eventKey: menu.eventKey,
        },
      ];
    }

    curModel.current.children.push({
      type,
      id,
      label: name,
      key,
      menus,
      conditionId: menu.conditionId,
      eventKey: menu.eventKey,
    });

    graphRef.current.updateChild(curModel.current, curModel.current.id);
    setMenuOpen(false);
    curModel.current = null;
  };

  function save() {
    settingRef?.current?.save();
  }

  return (
    <div>
      <div
        style={{ height: 'calc(100vh - 65px)', width: '100vw', overflowY: 'auto', overflowX: 'hidden' }}
        // className='bg-[#F2F7FA]'
        className='bg-container'
        ref={refContainer}
      />
      <ContextMenu
        position={position}
        items={curModel.current?.menus || []}
        onSelect={onSelect}
        open={menuOpen}
      />
      <Drawer
        title='设置'
        open={settingOpen}
        zIndex={1007}
        width={500}
        onClose={() => {
          setSettingOpen(false);
        }}
        extra={(
          <Button onClick={save} type='primary'>确定</Button>
        )}
        destroyOnClose
      >
        {settingMap[curModel?.current?.type] &&
          React.createElement(settingMap[curModel?.current?.type], {
            graphRef,
            curModel,
            setSettingOpen,
            ref: (_ref: any) => {
              settingRef.current = _ref;
            },
          })}
      </Drawer>
    </div>
  )
}

export default forwardRef(EventFlowDesign);