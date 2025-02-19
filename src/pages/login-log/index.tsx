import { t } from '@/utils/i18n';
import {
  Badge
} from 'antd';

import { login_log_page } from '@/api/loginLog';
import FProTable from '@/components/pro-table';
import { toPageRequestParams } from '@/utils/utils';
import { ProColumnType } from '@ant-design/pro-components';
import dayjs from 'dayjs';

function LoginLogPage() {
  const columns: ProColumnType<API.LoginLogVO>[] = [
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
    <FProTable<API.LoginLogVO>
      columns={columns}
      request={async (params) => {
        return login_log_page(
          toPageRequestParams(params)
        )
      }}
    />
  );
}

export default LoginLogPage;
