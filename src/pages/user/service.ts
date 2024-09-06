import { PageData, PageParams } from '@/interface';
import request from '@/request';
import { toPageRequestParams } from '@/utils/utils';
import { Role } from '../role/service';

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
  parentPaths?: string[];
  authCode?: string;
  curVersion?: string;
}

export interface User {
  id: number;
  userName: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  createDate: string;
  updateDate: string;
  avatar?: string | null;
  menus: Menu[];
  flatMenus: Menu[];
  avatarPath: string;
  authList: string[];
}

const userService = {
  // 分页获取用户列表
  getUserListByPage: async (
    params: PageParams & Partial<User>,
  ) => {
    return request.get<PageData<User>>('/api/user/page', { params: toPageRequestParams(params) })
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
    return request.post('/api/user/send/email/captcha', { email });
  },
  getRoles: () => {
    return request.get<Role[]>('/api/role/list');
  },
};

export default userService;
