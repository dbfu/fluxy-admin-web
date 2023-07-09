import React, { useEffect, useState } from 'react';
import { Modal, Tree, Tooltip } from 'antd';
import request from '@/request';

interface RoleInterfaceProps {
  visible: boolean;
  onClose: () => void;
  roleId?: string;
}

const RoleInterface: React.FC<RoleInterfaceProps> = (props) => {
  const { visible, onClose, roleId } = props;

  const [treeData, setTreeData] = useState<any[]>([]);
  const [checkeds, setCheckeds] = useState<any[]>([]);

  const getInterface = async () => {
    const [error, data] = await request.get<any[]>('/role/interface/list');
    if (!error) {
      setTreeData(
        data.map((item) => ({
          key: item.path,
          title: item.title,
          type: item.type,
          children: item.children?.map((o: any) => ({
            key: item.prefix + o.path,
            title: o.title,
            type: o.type,
            method: o.method,
            path: o.path,
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
            className="mr-8px inline-block w-40px text-center"
          >
            {String(record.method).toUpperCase()}
          </span>
          <span>{record.title}</span>
        </div>
      </Tooltip>
    );
  };

  const onOkHandle = async () => {
    const data = {
      role_id: roleId,
      interface_infos: checkeds
        ?.filter((node) => node.type === 'route')
        ?.map((node) => {
          return {
            path: node.key,
            method: node.method,
          };
        }),
    };
    const [error] = await request.post('/role/alloc/interface', data);
    if (!error) {
      onClose();
    }
  };

  useEffect(() => {
    if (visible) {
      getInterface();
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
    >
      <Tree
        treeData={treeData}
        checkable
        titleRender={titleRender}
        onCheck={checkHandle}
        checkedKeys={checkeds.map((node) => node.key)}
      />
    </Modal>
  );
};

export default RoleInterface;
