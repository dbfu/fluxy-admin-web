import { PageData } from '@/interface';
import request from '@/request';

export default {
  async getLowCodePages({ current, pageSize }: { current: number; pageSize: number }) {
    
    const [error, data] = await request.get<PageData<any>>('/api/menu/lowcode/menus/page', {
      params: {
        page: current - 1,
        size: pageSize,
      },
    });

    if (error) {
      return Promise.reject();
    }

    return {
      list: data.data,
      total: data.total,
    };
  },
  publishLowCodePage(data: any) {
    return request.post<any>('/api/menu/lowcode/version/publish', data);
  },
};
