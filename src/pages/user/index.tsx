import { t } from '@/utils/i18n';
import { Space, Table, Form, Row, Col, Input, Button, Popconfirm, App, Modal, FormInstance } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAntdTable, useRequest } from 'ahooks'
import dayjs from 'dayjs'
import { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

import NewAndEditForm from './newAndEdit';
import userService, { User } from './service';

const UserPage = () => {

  const [form] = Form.useForm();

  const { message } = App.useApp();
  const { tableProps, search: { submit, reset } } = useAntdTable(userService.getUserListByPage, { form });
  const { runAsync: deleteUser } = useRequest(userService.deleteUser, { manual: true });
  const [editData, setEditData] = useState<User | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const formRef = useRef<FormInstance>(null);

  const columns: ColumnsType<any> = [
    {
      title: t("qYznwlfj" /* 用户名 */),
      dataIndex: 'userName',
    },
    {
      title: t("gohANZwy" /* 昵称 */),
      dataIndex: 'nickName',
    },
    {
      title: t("yBxFprdB" /* 手机号 */),
      dataIndex: 'phoneNumber',
    },
    {
      title: t("XWVvMWig" /* 邮箱 */),
      dataIndex: 'email',
    },
    {
      title: t("ykrQSYRh" /* 性别 */),
      dataIndex: 'sex',
      render: (value: number) => value === 1 ? t("AkkyZTUy" /* 男 */) : t("yduIcxbx" /* 女 */),
    },
    {
      title: t("TMuQjpWo" /* 创建时间 */),
      dataIndex: 'createDate',
      render: (value: number) => value && dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: t("QkOmYwne" /* 操作 */),
      key: 'action',
      render: (_, record) => record.userName !== 'admin' && (
        <Space size="middle">
          <a
            onClick={() => {
              setEditData(record);
              setFormOpen(true);
            }}
          >{t("qEIlwmxC" /* 编辑 */)}</a>
          <Popconfirm
            title={t("JjwFfqHG" /* 警告 */)}
            description={t("nlZBTfzL" /* 确认删除这条数据？ */)}
            onConfirm={async () => {
              await deleteUser(record.id);
              message.success(t("bvwOSeoJ" /* 删除成功！ */));
              submit();
            }}
          >
            <a>{t("HJYhipnp" /* 删除 */)}</a>
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
  }

  return (
    <div>
      <Form onFinish={submit} form={form} size="large" className='dark:bg-[rgb(33,41,70)] bg-white p-[24px] rounded-lg'>
        <Row gutter={24}>
          <Col className='w-[100%]' lg={24} xl={8} >
            <Form.Item name="nickName" label={t("rnyigssw" /* 昵称 */)}>
              <Input onPressEnter={submit} />
            </Form.Item>
          </Col>
          <Col className='w-[100%]' lg={24} xl={8}>
            <Form.Item name="phoneNumber" label={t("SPsRnpyN" /* 手机号 */)}>
              <Input onPressEnter={submit} />
            </Form.Item>
          </Col>
          <Col className='w-[100%]' lg={24} xl={8}>
            <Space>
              <Button onClick={submit} type='primary'>{t("YHapJMTT" /* 搜索 */)}</Button>
              <Button onClick={reset}>{t("uCkoPyVp" /* 清除 */)}</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <div className="mt-[16px] dark:bg-[rgb(33,41,70)] bg-white rounded-lg px-[12px]">
        <div className='py-[16px] '>
          <Button onClick={openForm} type='primary' size='large' icon={<PlusOutlined />}>{t("morEPEyc" /* 新增 */)}</Button>
        </div>
        <Table
          rowKey="id"
          scroll={{ x: true }}
          columns={columns}
          className='bg-transparent'
          {...tableProps}
        />
      </div>
      <Modal
        title={editData ? t("wXpnewYo" /* 编辑 */) : t("VjwnJLPY" /* 新建 */)}
        open={formOpen}
        onOk={() => {
          formRef.current?.submit();
        }}
        destroyOnClose
        width={640}
        zIndex={1001}
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
    </div>
  );
}

export default UserPage;