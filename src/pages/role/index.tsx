import { t } from '@/utils/i18n';
import {
  Space,
  Table,
  Form,
  Row,
  Col,
  Input,
  Button,
  Modal,
  FormInstance,
  Divider,
  Popconfirm,
} from 'antd';
import { useAntdTable } from 'ahooks';
import { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import NewAndEditForm from './new-edit-form';
import roleService, { Role } from './service';
import dayjs from 'dayjs';
import { antdUtils } from '@/utils/antd';
import RoleMenu from './role-menu';

const UserPage = () => {
  const [form] = Form.useForm();

  const {
    tableProps,
    search: { submit, reset },
  } = useAntdTable(roleService.getRoleListByPage, { form });
  const [editData, setEditData] = useState<Role | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [roleMenuVisible, setRoleMenuVisible] = useState(false);
  const [curRoleId, setCurRoleId] = useState<string | null>();

  const formRef = useRef<FormInstance>(null);

  const columns: any[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '代码',
      dataIndex: 'code',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      hideInForm: true,
      search: false,
      valueType: 'dateTime',
      width: 190,
      render: (value: Date) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
      hideInForm: true,
      width: 240,
      align: 'center',
      search: false,
      render: (id: string, record: Role) => (
        <Space
          split={(
            <Divider type='vertical' />
          )}
        >
          <a
            onClick={async () => {
              setCurRoleId(id);
              setRoleMenuVisible(true);
            }}
          >
            分配菜单
          </a>
          <a
            onClick={() => {
              setEditData(record);
              setFormOpen(true);
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确认删除？"
            onConfirm={async () => {
              const [error] = await roleService.removeRole(id);
              if (!error) {
                antdUtils.message?.success('删除成功!');
                submit();
              }
            }}
            placement="topRight"
          >
            <a className="select-none">
              删除
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditData(null);
  };

  const saveHandle = () => {
    submit();
    setFormOpen(false);
    setEditData(null);
  };

  return (
    <div>
      <Form
        onFinish={submit}
        form={form}
        size='large'
        className='dark:bg-[rgb(33,41,70)] bg-white p-[24px] rounded-lg'
      >
        <Row gutter={24}>
          <Col className='w-[100%]' lg={24} xl={8}>
            <Form.Item name='code' label="代码">
              <Input onPressEnter={submit} />
            </Form.Item>
          </Col>
          <Col className='w-[100%]' lg={24} xl={8}>
            <Form.Item name='name' label="名称">
              <Input onPressEnter={submit} />
            </Form.Item>
          </Col>
          <Col className='w-[100%]' lg={24} xl={8}>
            <Space>
              <Button onClick={submit} type='primary'>
                {t('YHapJMTT' /* 搜索 */)}
              </Button>
              <Button onClick={reset}>{t('uCkoPyVp' /* 清除 */)}</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <div className='mt-[16px] dark:bg-[rgb(33,41,70)] bg-white rounded-lg px-[12px]'>
        <div className='py-[16px] '>
          <Button
            onClick={openForm}
            type='primary'
            size='large'
            icon={<PlusOutlined />}
          >
            {t('morEPEyc' /* 新增 */)}
          </Button>
        </div>
        <Table
          rowKey='id'
          scroll={{ x: true }}
          columns={columns}
          className='bg-transparent'
          {...tableProps}
        />
      </div>
      <Modal
        title={editData ? t('wXpnewYo' /* 编辑 */) : t('VjwnJLPY' /* 新建 */)}
        open={formOpen}
        onOk={() => {
          formRef.current?.submit();
        }}
        destroyOnClose
        width={640}
        onCancel={closeForm}
        confirmLoading={saveLoading}
      >
        <NewAndEditForm
          ref={formRef}
          editData={editData}
          onSave={saveHandle}
          open={formOpen}
          setSaveLoading={setSaveLoading}
        />
      </Modal>
      <RoleMenu
        onCancel={() => {
          setCurRoleId(null); setRoleMenuVisible(false);
        }}
        roleId={curRoleId}
        visible={roleMenuVisible}
      />
    </div>
  );
};

export default UserPage;
