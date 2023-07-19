import {PageData} from '@/interface';
import request from '@/request';

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
    {current, pageSize}: {current: number; pageSize: number},
    formData: any
  ) => {
    const [error, data] = await request.get<PageData<LoginLog>>(
      '/api/login-log/page',
      {
        params: {
          page: current - 1,
          size: pageSize,
          ...formData,
        },
      }
    );

    if (error) {
      return Promise.reject();
    }

    return {
      list: data.data,
      total: data.total,
    };
  },
};

export default loginLogService;
