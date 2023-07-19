import { t } from '@/utils/i18n';
import {
  Space,
  Table,
  Form,
  Row,
  Col,
  Input,
  Button,
  Badge,
} from 'antd';
import { useAntdTable } from 'ahooks';

import loginLogService, { LoginLog } from './service';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';

const LoginLogPage = () => {
  const [form] = Form.useForm();

  const {
    tableProps,
    search: { submit, reset },
  } = useAntdTable(loginLogService.getRoleListByPage, { form });

  const columns: ColumnsType<LoginLog> = [
    {
      title: '登录帐号',
      dataIndex: 'userName',
    },
    {
      title: '登录IP',
      dataIndex: 'ip',
    },
    {
      title: '登录地址',
      dataIndex: 'address',
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
    },
    {
      title: '操作系统',
      dataIndex: 'os',
    },
    {
      title: '登录状态',
      dataIndex: 'status',
      render: (value: boolean) => {
        return value ? (
          <Badge status='success' text="成功" />
        ) : (
          <Badge status='error' text="失败" />
        );
      },
    },
    {
      title: '登录消息',
      dataIndex: 'message',
    },
    {
      title: '登录时间',
      dataIndex: 'createDate',
      render: (value: Date) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  ];

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
            <Form.Item name='userName' label="登录帐号">
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
        <Table
          rowKey='id'
          scroll={{ x: true }}
          columns={columns}
          className='bg-transparent'
          {...tableProps}
        />
      </div>
    </div>
  );
};

export default LoginLogPage;
