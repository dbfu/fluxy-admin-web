import React, { useEffect, useMemo, useState } from 'react'
import { Modal, Form, Input, Switch, Radio, InputNumber, Select, TreeSelect } from 'antd'
import { componentPaths } from '@/config/routes';
import { antdIcons } from '@/assets/antd-icons';
import menuService, { Api, Menu } from './service';
import { antdUtils } from '@/utils/antd';
import { useRequest } from '@/hooks/use-request';
import { MenuType } from './interface';

interface CreateMemuProps {
  visible: boolean;
  onCancel: (flag?: boolean) => void;
  curRecord?: Menu | null;
  onSave: () => void;
  editData?: Menu | null;
}


const CreateMenu: React.FC<CreateMemuProps> = (props) => {

  const { visible, onCancel, curRecord, onSave, editData } = props;
  const [saveLoading, setSaveLoading] = useState(false);
  const [form] = Form.useForm();

  const { data: apiData } = useRequest(menuService.getApiList);
  const { runAsync: getAllocApis } = useRequest(menuService.getAllocApis, { manual: true });


  useEffect(() => {
    if (visible) {
      setInitValue();
    } else {
      form.resetFields();
    }
  }, [visible]);

  async function setInitValue() {
    if (editData) {
      form.setFieldsValue(editData);
      const [, allocApis] = await getAllocApis(editData.id);
      form.setFieldValue('apis', allocApis.map((api: Api) => [api.method, api.path].join('~')))
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
  }

  const titleRender = (record: any) => {
    if (record.type === 'controller') {
      return <div>{record.title}</div>;
    }

    const colorMap: any = {
      get: '#00FA9A',
      post: '#FF8C00',
      put: '#00BFFF',
      delete: '#DC143C',
    };

    return (
      <div>
        <span>{record.title}</span>
        <span
          style={{ color: colorMap[record.method] }}
          className="ml-8px inline-block w-60px"
        >
          {String(record.method).toUpperCase()}
        </span>
      </div>
    );
  };

  const formatApi = useMemo(() => {
    return (apiData || []).map((item: any) => ({
      value: item.path,
      label: titleRender(item),
      type: item.type,
      children: item.children?.map((o: any) => ({
        value: `${o.method}~${item.prefix}${o.path}`,
        label: titleRender(o),
        type: o.type,
        method: o.method,
        path: item.prefix + o.path,
      })),
    }));
  }, [apiData]);

  const save = async (values: any) => {
    setSaveLoading(true);
    values.parentId = curRecord?.id || null;
    if (values.type === MenuType.DIRECTORY) {
      values.show = true;
    } else if (values.type === MenuType.BUTTON) {
      values.show = false;
    }

    values.apis = (values.apis || []).map((api: string) => {
      const [method, path] = api.split('~');
      return {
        method,
        path,
      }
    });

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
        <Form.Item
          label="名称"
          name="name"
          rules={[{
            required: true,
            message: '不能为空',
          }]}
        >
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
          }, {
            required: true,
            message: '不能为空',
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
        <Form.Item
          rules={[{
            required: true,
            message: '不能为空',
          }]}
          label="名称"
          name="name"
        >
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
          }, {
            required: true,
            message: '不能为空',
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: '不能为空',
          }]}
          label="文件地址"
          name="filePath"
        >
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

  console.log(formatApi, 'formatApi');


  const renderButtonForm = () => {
    return (
      <>
        <Form.Item
          rules={[{
            required: true,
            message: '不能为空',
          }]}
          label="名称"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: '不能为空',
          }]}
          label="权限代码"
          name="authCode"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="绑定接口"
          name="apis"
        >
          <TreeSelect maxTagCount={3} treeCheckable treeData={formatApi} />
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