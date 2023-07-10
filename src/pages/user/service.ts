import {PageData} from '@/interface';
import request from '@/request';

export interface Menu {
  id: string;
  parentId?: string;
  name?: string;
  icon?: string;
  type?: number;
  route?: string;
  filePath?: string;
  orderNumber?: number;
  url?: string;
  show?: boolean;
  children?: Menu[];
  path: string;
  Component?: any;
  parentPaths?: string[];
  authCode?: string;
}

export interface User {
  id: number;
  userName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  createDate: string;
  updateDate: string;
  avatar?: any;
  menus: Menu[];
  routes: any[];
  flatMenus: Menu[];
  avatarPath: string;
  authList: string[];
}

const userService = {
  // 分页获取用户列表
  getUserListByPage: async (
    {current, pageSize}: {current: number; pageSize: number},
    formData: any
  ) => {
    const [error, data] = await request.get<PageData<User>>('/api/user/page', {
      params: {
        page: current - 1,
        size: pageSize,
        ...formData,
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
  // 添加用户
  addUser: (data: User) => {
    return request.post('/api/user', data);
  },
  // 更新用户
  updateUser: (data: User) => {
    return request.put('/api/user', data);
  },
  // 删除用户
  deleteUser: (id: number) => {
    return request.delete(`/api/user/${id}`);
  },
  sendEmailCaptcha: (email: string) => {
    return request.post('/api/user/send/email/captcha', {email});
  },
  getRoles: () => {
    return request.get<any[]>('/api/role/list');
  },
};

export default userService;
