import { t } from '@/utils/i18n';
import {
  Avatar,
  Button,
  Popconfirm,
  Space,
  Tag
} from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

import { IconBuguang } from '@/assets/icons/buguang';
import LinkButton from '@/components/link-button';
import FProTable from '@/components/pro-table';
import { antdUtils } from '@/utils/antd';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Role } from '../role/service';
import NewAndEditForm from './new-edit-form';
import userService, { User } from './service';

function UserPage() {

  const actionRef = useRef<ActionType>();

  const { runAsync: deleteUser } = useRequest(userService.deleteUser, {
    manual: true,
  });
  const [editData, setEditData] = useState<User | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const columns: ProColumns<User>[] = [{
    title: t("YxQffpdF" /* 头像 */),
    dataIndex: 'avatarPath',
    renderText: (value) => (
      <div className='flex justify-center'>
        {value ? (
          <img src={value} className='w-[40px] h-[40px] flex items-center rounded-[50%]' />
        ) : (
          <Avatar
            className='bg-[gold] align-middle flex items-center justify-center w-[40px] h-[40px]'
            icon={<IconBuguang />}
          />
        )}
      </div>
    ),
    align: 'center',
    width: 100,
    search: false,
  },
  {
    title: t('qYznwlfj' /* 用户名 */),
    dataIndex: 'userName',
  },
  {
    title: t('gohANZwy' /* 昵称 */),
    dataIndex: 'nickName',
  },
  {
    title: t('yBxFprdB' /* 手机号 */),
    dataIndex: 'phoneNumber',
  },
  {
    title: t('XWVvMWig' /* 邮箱 */),
    dataIndex: 'email',
  },
  {
    title: t("PnmzVovn" /* 角色 */),
    dataIndex: 'roles',
    valueType: 'select',
    renderText: (roles: Role[]) => {
      return (
        <Space>
          {(roles || []).map(role => (
            <Tag key={role.id} color='geekblue'>{role.name}</Tag>
          ))}
        </Space>
      )
    },
    search: false,
  },
  {
    title: t('TMuQjpWo' /* 创建时间 */),
    dataIndex: 'createDate',
    renderText: (value: number) =>
      value && dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    search: false,
  },
  {
    title: t('QkOmYwne' /* 操作 */),
    key: 'action',
    search: false,
    align: 'center',
    width: 150,
    render: (_, record) =>
      record.userName !== 'admin' && record.userName !== 'user' && (
        <Space size='middle'>
          <LinkButton
            onClick={() => {
              setEditData(record);
              setFormOpen(true);
            }}
          >
            {t('qEIlwmxC' /* 编辑 */)}
          </LinkButton>
          <Popconfirm
            title={t('JjwFfqHG' /* 警告 */)}
            description={t('nlZBTfzL' /* 确认删除这条数据？ */)}
            onConfirm={async () => {
              const [error] = await deleteUser(record.id);
              if (!error) {
                antdUtils.message.success(t('bvwOSeoJ' /* 删除成功！ */));
                actionRef.current?.reload();
              }
            }}
          >
            <LinkButton>{t('HJYhipnp' /* 删除 */)}</LinkButton>
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
      <FProTable<User, { userName?: string }>
        actionRef={actionRef}
        request={async (
          params
        ) => {
          return userService.getUserListByPage(params)
        }}
        columns={columns || []}
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
        editData={editData}
        onSaveSuccess={saveHandle}
        open={formOpen}
        onClose={closeForm}
        title={editData ? t('wXpnewYo' /* 编辑 */) : t('VjwnJLPY' /* 新建 */)}
      />
    </>
  );
}

export default UserPage;
