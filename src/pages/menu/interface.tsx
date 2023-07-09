import React, { useEffect, useState } from 'react';
import { Modal, Tree, Tooltip, Spin } from 'antd';
import request from '@/request';

interface MenuInterfaceProps {
  visible: boolean;
  onClose: () => void;
  menuId?: string;
}

const MenuInterface: React.FC<MenuInterfaceProps> = (props) => {
  const { visible, onClose, menuId } = props;

  const [treeData, setTreeData] = useState<any[]>([]);
  const [checkeds, setCheckeds] = useState<any[]>([]);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const getInterface = async () => {
    const [error, data] = await request.get<any[]>('/role/interface/list');
    if (!error) {
      setTreeData(
        data.map((item) => ({
          key: item.path,
          title: item.title,
          type: item.type,
          children: item.children?.map((o: any) => ({
            key: item.prefix + o.path + o.method,
            title: o.title,
            type: o.type,
            method: o.method,
            path: item.prefix + o.path,
          })),
        })),
      );
    }
  };

  const checkHandle = (_: any, { checkedNodes }: any) => {
    setCheckeds(checkedNodes);
  };

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
      <Tooltip placement="right" title={record.path}>
        <div>
          <span
            style={{ color: colorMap[record.method] }}
            className="mr-8px inline-block w-60px"
          >
            {String(record.method).toUpperCase()}
          </span>
          <span>{record.title}</span>
        </div>
      </Tooltip>
    );
  };

  const onOkHandle = async () => {
    setSaveLoading(true);
    const data = {
      menu_id: menuId,
      interface_infos: checkeds
        ?.filter((node) => node.type === 'route')
        ?.map((node) => {
          return {
            path: node.path,
            method: node.method,
          };
        }),
    };
    const [error] = await request.post('/menu/alloc/interface', data);
    if (!error) {
      onClose();
    }

    setSaveLoading(false);
  };

  const getAllocInterfaces = async () => {
    const [error, interfaces] = await request.get<any[]>(
      '/menu/alloc/interface/list',
      {
        params: { menuId },
      },
    );
    if (!error) {
      setCheckeds(
        interfaces.map((route) => ({
          key: route.path + route.method,
          method: route.method,
        })),
      );
    }
    console.log(interfaces);
  };

  const initData = async () => {
    setLoading(true);
    await Promise.all([getAllocInterfaces(), getInterface()]);
    setLoading(false);
  };

  useEffect(() => {
    if (visible) {
      initData();
    }
  }, [visible]);

  return (
    <Modal
      title="分配接口权限"
      open={visible}
      bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
      width={800}
      onCancel={onClose}
      onOk={onOkHandle}
      confirmLoading={saveLoading}
    >
      <Spin spinning={loading}>
        <Tree
          treeData={treeData}
          checkable
          titleRender={titleRender}
          onCheck={checkHandle}
          checkedKeys={checkeds.map((node) => node.key)}
        />
      </Spin>
    </Modal>
  );
};

export default MenuInterface;
