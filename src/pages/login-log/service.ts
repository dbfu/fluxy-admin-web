import { PageData, PageParams } from '@/interface';
import request from '@/request';
import { toPageRequestParams } from '@/utils/utils';

export interface LoginLog {
  userName?: string;
  ip?: string;
  address?: string;
  browser?: string;
  os?: string;
  status?: boolean;
  message?: string;
}

const loginLogService = {
  getRoleListByPage: async (
    params: PageParams & Partial<LoginLog>,
  ) => {
    return request.get<PageData<LoginLog>>('/api/login-log/page', {
      params: toPageRequestParams(params),
    });
  }
};

export default loginLogService;
