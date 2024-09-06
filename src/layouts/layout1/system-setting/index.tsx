import { defaultSetting } from '@/default-setting';
import { useSelector } from '@/hooks/use-selector';
import { useSettingStore } from '@/stores/setting';
import { antdUtils } from '@/utils/antd';
import { SettingOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Drawer, FloatButton, Form, Select, Space, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

const colors = [
  '#1890ff',
  '#7c4dff',
  '#8b5cda',
  '#a855f7',
  '#0ea5e9',
  '#06b6d4',
  '#f43f5e',
  '#ef4444',
  '#ec4899',
  '#d946ef',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981'
];

function SystemSetting() {
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm()

  const {
    setPrimaryColor,
    primaryColor,
    setShowKeepAliveTab,
    showKeepAliveTab,
    filterType,
    setFilterType,
    showFormType,
    setShowFormType,
    reset,
  } = useSettingStore(
    useSelector([
      'setPrimaryColor',
      'primaryColor',
      'setShowKeepAliveTab',
      'showKeepAliveTab',
      'filterType',
      'setFilterType',
      'showFormType',
      'setShowFormType',
      'reset',
    ])
  );

  return (
    <>
      <FloatButton
        type='primary'
        icon={<SettingOutlined />}
        tooltip="系统设置"
        onClick={() => {
          setVisible(true);
        }}
      />
      <Drawer
        open={visible}
        onClose={() => {
          setVisible(false);
        }}
        title="系统设置"
        forceRender
        footer={(
          <Space size="large">
            <Button
              onClick={() => {
              copy(`
                import { SystemSettingType } from './interface';

export const defaultSetting = ${JSON.stringify({ ...defaultSetting, ...form.getFieldsValue() }, null, 2)} as SystemSettingType;
                `
              );
              antdUtils.message.success('复制成功');
            }}
              type='primary'
            >
              复制配置
            </Button>
            <Button
              type='primary'
              danger
              onClick={() => {
                reset();
                form.resetFields();
                antdUtils.message.success('重置成功');
              }}
            >
              重置配置
            </Button>
          </Space>
        )}
      >
        <Form
          wrapperCol={{ flex: 1 }}
          labelCol={{ flex: '0 0 120px' }}
          initialValues={{
            primaryColor,
            showKeepAliveTab,
            filterType,
            showFormType,
          }}
          form={form}
        >
          <Form.Item
            label="主题色"
            name="primaryColor"
          >
            <ColorPicker
              presets={[{
                label: '常用',
                colors,
                defaultOpen: true,
              }]}
              onChange={(color) => {
                setPrimaryColor(color.toRgbString());
              }}
            />
          </Form.Item>
          <Form.Item
            label="显示标签栏"
            name="showKeepAliveTab"
            valuePropName='checked'
          >
            <Switch
              onChange={(value) => {
                setShowKeepAliveTab(value);
              }}
              checkedChildren="显示"
              unCheckedChildren="隐藏"
            />
          </Form.Item>
          <Form.Item
            label="表格查询类型"
            name="filterType"
          >
            <Select
              onChange={setFilterType}
              options={[
                { label: '简洁', value: 'light' },
                { label: '表单', value: 'query' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="表单显示方式"
            name="showFormType"
          >
            <Select
              onChange={setShowFormType}
              options={[
                { label: '弹框', value: 'modal' },
                { label: '抽屉', value: 'drawer' },
              ]}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default SystemSetting;


