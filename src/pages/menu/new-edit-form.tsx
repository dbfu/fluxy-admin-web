import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Switch, Radio, InputNumber, Select } from 'antd'
import { componentPaths } from '@/config/routes';
import { antdIcons } from '@/assets/antd-icons';
import menuService, { Menu } from './service';
import { antdUtils } from '@/utils/antd';

interface CreateMemuProps {
  visible: boolean;
  onCancel: (flag?: boolean) => void;
  curRecord?: Menu;
  onSave: () => void;
  editData?: Menu | null;
}

export enum MenuType {
  DIRECTORY = 1,
  MENU,
  BUTTON,
}

export const MenuTypeName = {
  [MenuType.DIRECTORY.toString()]: '目录',
  [MenuType.MENU.toString()]: '菜单',
  [MenuType.BUTTON.toString()]: '按钮',
}

const CreateMenu: React.FC<CreateMemuProps> = (props) => {

  const { visible, onCancel, curRecord, onSave, editData } = props;
  const [saveLoading, setSaveLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (editData) {
        form.setFieldsValue(editData);
      } else if (curRecord) {
        form.setFieldsValue({
          show: true,
          type: curRecord?.type === MenuType.MENU ? MenuType.MENU : MenuType.DIRECTORY,
        })
      } else {
        form.setFieldsValue({
          show: true,
          type: MenuType.DIRECTORY,
        })
      }
    } else {
      form.resetFields();
    }
  }, [visible]);

  const save = async (values: any) => {
    setSaveLoading(true);
    values.parentId = curRecord?.id || null;
    if (values.type === MenuType.DIRECTORY) {
      values.show = true;
    } else if (values.type === MenuType.BUTTON) {
      values.show = false;
    }

    if (editData) {
      values.parentId = editData.parentId;
      const [error] = await menuService.updateMenu({ ...editData, ...values });
      if (!error) {
        antdUtils.message?.success("更新成功");
        onSave()
      }
    } else {
      const [error] = await menuService.addMenu(values);
      if (!error) {
        antdUtils.message?.success("新增成功");
        onSave()
      }
    }
    setSaveLoading(false);
  }

  const renderDirectoryForm = () => {
    return (
      <>
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="图标" name="icon">
          <Select>
            {Object.keys(antdIcons).map((key) => (
              <Select.Option key={key}>{React.createElement(antdIcons[key])}</Select.Option>
            ))}
          </Select >
        </Form.Item>
        <Form.Item
          tooltip="以/开头，不用手动拼接上级路由。参数格式/:id"
          label="路由"
          name="route"
          rules={[{
            pattern: /^\//,
            message: '必须以/开头',
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="排序号" name="orderNumber">
          <InputNumber />
        </Form.Item>
      </>
    )
  }

  const renderMenuForm = () => {
    return (
      <>
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="图标" name="icon">
          <Select>
            {Object.keys(antdIcons).map((key) => (
              <Select.Option key={key}>{React.createElement(antdIcons[key])}</Select.Option>
            ))}
          </Select >
        </Form.Item>
        <Form.Item
          tooltip="以/开头，不用手动拼接上级路由。参数格式/:id"
          label="路由"
          name="route"
          rules={[{
            pattern: /^\//,
            message: '必须以/开头',
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="文件地址" name="filePath">
          <Select
            options={componentPaths.map(path => ({
              label: path,
              value: path,
            }))}
          />
        </Form.Item>
        <Form.Item valuePropName="checked" label="是否显示" name="show">
          <Switch />
        </Form.Item>
        <Form.Item label="排序号" name="orderNumber">
          <InputNumber />
        </Form.Item>
      </>
    )
  }

  const renderButtonForm = () => {
    return (
      <>
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="权限代码" name="authCode">
          <Input />
        </Form.Item>
      </>
    )
  }


  const renderFormMap = {
    [MenuType.DIRECTORY.toString()]: renderDirectoryForm,
    [MenuType.MENU.toString()]: renderMenuForm,
    [MenuType.BUTTON.toString()]: renderButtonForm,
  }

  return (
    <Modal
      open={visible}
      title="新建"
      onOk={() => {
        form.submit();
      }}
      confirmLoading={saveLoading}
      width={640}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={save}
        labelCol={{ flex: '0 0 100px' }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="类型" name="type">
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
          >
            {curRecord?.type !== MenuType.MENU && (
              <Radio value={MenuType.DIRECTORY}>目录</Radio>
            )}
            <Radio value={MenuType.MENU}>菜单</Radio>
            <Radio value={MenuType.BUTTON}>按钮</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => renderFormMap[form.getFieldValue('type') as string]?.()}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateMenu;