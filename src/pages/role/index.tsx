import { t } from '@/utils/i18n';
import {
  Button,
  Divider,
  Popconfirm,
  Space
} from 'antd';
import { useRef, useState } from 'react';

import LinkButton from '@/components/link-button';
import FProTable from '@/components/pro-table';
import { antdUtils } from '@/utils/antd';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumnType } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import NewAndEditForm from './new-edit-form';
import RoleMenu from './role-menu';
import roleService, { Role } from './service';


function RolePage() {
  const [editData, setEditData] = useState<Role | null>(null);
  const [roleMenuVisible, setRoleMenuVisible] = useState(false);
  const [curRoleId, setCurRoleId] = useState<string | null>();
  const [formOpen, setFormOpen] = useState(false);
  const actionRef = useRef<ActionType>();


  const columns: ProColumnType<Role>[] = [
    {
      title: t("qvtQYcfN" /* 名称 */),
      dataIndex: 'name',
    },
    {
      title: t("WIRfoXjK" /* 代码 */),
      dataIndex: 'code',
      valueType: 'text',
    },
    {
      title: t("TMuQjpWo" /* 创建时间 */),
      dataIndex: 'createDate',
      hideInForm: true,
      search: false,
      valueType: 'dateTime',
      width: 190,
      renderText: (value: Date) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: t("QkOmYwne" /* 操作 */),
      dataIndex: 'id',
      hideInForm: true,
      width: 240,
      align: 'center',
      search: false,
      renderText: (id: string, record: Role) => (
        <Space
          split={(
            <Divider type='vertical' />
          )}
        >
          <LinkButton
            onClick={async () => {
              setCurRoleId(id);
              setRoleMenuVisible(true);
            }}
          >
            {t("DvINURho" /* 分配菜单 */)}
          </LinkButton>
          <LinkButton
            onClick={() => {
              setEditData(record);
              setFormOpen(true);
            }}
          >
            {t("wXpnewYo" /* 编辑 */)}
          </LinkButton>
          <Popconfirm
            title={t("RCCSKHGu" /* 确认删除？ */)}
            onConfirm={async () => {
              const [error] = await roleService.removeRole(id);
              if (!error) {
                antdUtils.message?.success(t("CVAhpQHp" /* 删除成功! */));
                actionRef.current?.reload();
              }
            }}
            placement="topRight"
          >
            <LinkButton
            >
              {t("HJYhipnp" /* 删除 */)}
            </LinkButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditData(null);
  };

  const saveHandle = () => {
    actionRef.current?.reload();
    setFormOpen(false);
    setEditData(null);
  };

  return (
    <>
      <FProTable<Role, Omit<Role, 'id'>>
        actionRef={actionRef}
        columns={columns}
        request={async params => {
          return roleService.getRoleListByPage(params);
        }}
        headerTitle={(
          <Space>
            <Button
              onClick={openForm}
              type='primary'
              icon={<PlusOutlined />}
            >
              {t('morEPEyc' /* 新增 */)}
            </Button>
          </Space>
        )}
      />
      <NewAndEditForm
        onOpenChange={open => !open && closeForm()}
        editData={editData}
        onSaveSuccess={saveHandle}
        open={formOpen}
        title={editData ? t('wXpnewYo' /* 编辑 */) : t('VjwnJLPY' /* 新建 */)}
      />
      <RoleMenu
        onCancel={() => {
          setCurRoleId(null);
          setRoleMenuVisible(false);
        }}
        roleId={curRoleId}
        visible={roleMenuVisible}
      />
    </>
  );
}

export default RolePage;
