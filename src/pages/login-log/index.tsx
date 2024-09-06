import { t } from '@/utils/i18n';
import {
  Badge
} from 'antd';

import FProTable from '@/components/pro-table';
import { ProColumnType } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import loginLogService, { LoginLog } from './service';

function LoginLogPage() {
  const columns: ProColumnType<LoginLog>[] = [
    {
      title: t("EOnUUxNS" /* 登录帐号 */),
      dataIndex: 'userName',
    },
    {
      title: t("SQQeztUX" /* 登录IP */),
      dataIndex: 'ip',
      search: false,
    },
    {
      title: t("pcFVrbFq" /* 登录地址 */),
      dataIndex: 'address',
      search: false,
    },
    {
      title: t("ZroXYzZI" /* 浏览器 */),
      dataIndex: 'browser',
      search: false,
    },
    {
      title: t("MsdUjinV" /* 操作系统 */),
      dataIndex: 'os',
      search: false,
    },
    {
      title: t("aQMiCXYx" /* 登录状态 */),
      dataIndex: 'status',
      search: false,
      renderText: (value: boolean) => {
        return value ? (
          <Badge status='success' text={t("pyuYsBVW" /* 成功 */)} />
        ) : (
          <Badge status='error' text={t("HaLzGNdm" /* 失败 */)} />
        );
      },
    },
    {
      title: t("pzvzlzLU" /* 登录消息 */),
      dataIndex: 'message',
      search: false,
    },
    {
      title: t("AZWKRNAc" /* 登录时间 */),
      search: false,
      dataIndex: 'createDate',
      renderText: (value: Date) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      }
    },
  ];


  return (
    <FProTable<LoginLog>
      columns={columns}
      request={async (params) => loginLogService.getRoleListByPage(params)}
    />
  );
}

export default LoginLogPage;
