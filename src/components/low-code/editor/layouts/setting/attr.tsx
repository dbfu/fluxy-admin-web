import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import CommonSetter from '../../common/common-setter';
import SettingFormItemSwitch from '../../common/setting-form-item/switch';
import { useComponentConfigStore } from '../../stores/component-config';
import { useComponentsStore } from '../../stores/components';

const ComponentAttr = () => {

  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentProps, updateComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {

    const data = form.getFieldsValue(true);


    const newData = Object.keys(data).reduce((prev: any, key) => {
      prev[key] = null;
      return prev;
    }, {})


    // 初始化表单
    form.setFieldsValue({...newData, ...curComponent?.props});
  }, [curComponent])

  // 监听表单值变化，更新组件属性
  function valueChange(changeValues: any) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }

  if (!curComponentId || !curComponent) return null;

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item label="组件id">
        <Input value={curComponent.id} disabled />
      </Form.Item>
      <Form.Item label="组件名称">
        <Input value={curComponent.name} disabled />
      </Form.Item>
      <Form.Item label="组件描述">
        <Input
          onChange={e => {
            updateComponent(curComponentId, 'desc', e.target.value);
          }}
          value={curComponent.desc}
        />
      </Form.Item>
      <Form.Item label="隐藏">
        <SettingFormItemSwitch
          onChange={value => {
            updateComponent(curComponentId, 'hidden', value);
          }}
          value={curComponent.hidden}
        />
      </Form.Item>
      {componentConfig[curComponent?.name]?.setter && (
        !Array.isArray(componentConfig[curComponent?.name]?.setter) ?
          React.createElement(componentConfig[curComponent.name].setter!) : (
            <CommonSetter setters={componentConfig[curComponent.name].setter} />
          )
      )}
    </Form>
  )
}

export default ComponentAttr;