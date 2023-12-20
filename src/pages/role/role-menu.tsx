import { antdUtils } from '@/utils/antd';
import { Modal, Radio, Spin, Tree } from 'antd';
import { DataNode } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { Menu } from '../menu/service';
import roleService from './service';

interface RoleMenuProps {
  visible: boolean;
  onCancel: () => void;
  roleId?: string | null;
  onSave?: (checkedKeys: string[]) => void;
}

const RoleMenu: React.FC<RoleMenuProps> = (props) => {
  const { visible, onCancel, roleId, onSave } = props;
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [getDataLoading, setGetDataLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectType, setSelectType] = useState('allChildren');

  const getAllChildrenKeys = (children: any[], keys: string[]): void => {
    (children || []).forEach((node) => {
      keys.push(node.key);
      getAllChildrenKeys(node.children, keys);
    });
  };

  const getFirstChildrenKeys = (children: any[], keys: string[]): void => {
    (children || []).forEach((node) => {
      keys.push(node.key);
    });
  };

  const onCheck = (_: any, { checked, node }: any) => {
    const keys = [node.key];
    if (selectType === 'allChildren') {
      getAllChildrenKeys(node.children, keys);
    } else if (selectType === 'firstChildren') {
      getFirstChildrenKeys(node.children, keys);
    }

    if (checked) {
      setCheckedKeys((prev) => [...prev, ...keys]);
    } else {
      setCheckedKeys((prev) => prev.filter((o) => !keys.includes(o)));
    }
  };

  const formatTree = (roots: Menu[] = [], group: Record<string, Menu[]>): DataNode[] => {
    return roots.map((node) => {
      return {
        key: node.id,
        title: node.name,
        children: formatTree(group[node.id] || [], group),
      } as DataNode;
    });
  };

  const getData = async () => {
    setGetDataLoading(true);
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

    setGetDataLoading(false);
  };

  const getCheckedKeys = async () => {
    if (!roleId) return;

    const [error, data] = await roleService.getRoleMenus(roleId);

    if (!error) {
      setCheckedKeys(data);
    }
  };

  const save = async () => {

    if (onSave) {
      onSave(checkedKeys);
      return;
    }

    if (!roleId) return;

    setSaveLoading(true);
    const [error] = await roleService.setRoleMenus(checkedKeys, roleId)

    setSaveLoading(false);

    if (!error) {
      antdUtils.message?.success('分配成功');
      onCancel();
    }
  };

  useEffect(() => {
    if (visible) {
      getData();
      getCheckedKeys();
    } else {
      setCheckedKeys([]);
    }
  }, [visible]);

  return (
    <Modal
      open={visible}
      title="分配菜单"
      onCancel={() => {
        onCancel();
      }}
      width={640}
      onOk={save}
      confirmLoading={saveLoading}
      styles={{
        body: {
          height: 400,
          overflowY: 'auto',
          padding: '20px 0',
        }
      }}
    >
      {getDataLoading ? (
        <Spin />
      ) : (
        <div>
          <label>选择类型：</label>
          <Radio.Group
            onChange={(e) => setSelectType(e.target.value)}
            defaultValue="allChildren"
            optionType="button"
            buttonStyle="solid"
          >
            <Radio value="allChildren">所有子级</Radio>
            <Radio value="current">当前</Radio>
            <Radio value="firstChildren">一级子级</Radio>
          </Radio.Group>
          <div className="mt-16px">
            <Tree
              checkable
              onCheck={onCheck}
              treeData={treeData}
              checkedKeys={checkedKeys}
              checkStrictly
              className='py-[10px]'
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RoleMenu;
