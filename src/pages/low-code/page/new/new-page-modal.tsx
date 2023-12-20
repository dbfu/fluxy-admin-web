import { antdIcons } from '@/assets/antd-icons';
import { useVariablesStore } from '@/components/low-code/editor/stores/variable';
import { useRequest } from '@/hooks/use-request';
import { MenuType } from '@/pages/menu/interface';
import menuService, { Menu } from '@/pages/menu/service';
import roleService from '@/pages/role/service';
import { antdUtils } from '@/utils/antd';
import { Form, Input, InputNumber, Modal, Select, Switch, TreeSelect } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComponentsStore } from '../../../../components/low-code/editor/stores/components';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NewPageModal: React.FC<Props> = ({
  open,
  setOpen,
}) => {

  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const { components } = useComponentsStore();
  const { variables } = useVariablesStore();

  const navigate = useNavigate();

  const {
    runAsync,
    loading: saveLoading,
  } = useRequest(menuService.addMenu, { manual: true });

  const [form] = Form.useForm();

  const formatTree = (roots: Menu[] = [], group: Record<string, Menu[]>): DataNode[] => {
    return roots.map((node) => {
      return {
        value: node.id,
        label: node.name,
        key: node.id,
        title: node.name,
        children: formatTree(group[node.id] || [], group),
      } as DataNode;
    });
  };

  const getData = async () => {
    const [error, data] = await roleService.getAllMenus();

    if (!error) {
      const group = data.reduce<Record<string, Menu[]>>((prev, cur) => {
        if (!cur.parentId) {
          return prev;
        }

        if (prev[cur.parentId]) {
          prev[cur.parentId].push(cur);
        } else {
          prev[cur.parentId] = [cur];
        }
        return prev;
      }, {});

      const roots = data.filter((o) => !o.parentId);

      const newTreeData = formatTree(roots, group);
      setTreeData(newTreeData);
    }

  };

  const save = async (values: any) => {

    // 写死菜单类型为低代码页面
    values.type = MenuType.LowCodePage;
    // 把组件和变量转成字符串，传给后端
    values.pageSetting = JSON.stringify({ components, variables });

    const [error, data] = await runAsync(values);
    if (!error) {
      antdUtils.message?.success('保存成功');
      setOpen(false);
      navigate(`/low-code/page/edit-page/${data?.version?.id}`)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      title="保存页面"
      open={open}
      onCancel={() => { setOpen(false); }}
      width={640}
      onOk={() => { form.submit(); }}
      confirmLoading={saveLoading}
    >
      <Form
        form={form}
        onFinish={save}
        labelCol={{ flex: '0 0 100px' }}
        wrapperCol={{ span: 16 }}
        initialValues={{ show: true }}
      >
        <Form.Item
          rules={[{
            required: true,
            message: '不能为空',
          }]}
          label="上级菜单"
          name="parentId"
        >
          <TreeSelect treeData={treeData} />
        </Form.Item>
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
        <Form.Item valuePropName="checked" label="是否显示" name="show">
          <Switch />
        </Form.Item>
        <Form.Item label="排序号" name="orderNumber">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default NewPageModal;