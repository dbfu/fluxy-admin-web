import {PageData} from '@/interface';
import request from '@/request';
import {Menu} from '../menu/service';

export interface Role {
  id?: string;
  name: string;
  code: string;
}

const roleService = {
  getRoleListByPage: async (
    {current, pageSize}: {current: number; pageSize: number},
    formData: any
  ) => {
    const [error, data] = await request.get<PageData<Role>>('/api/role/page', {
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
  addRole: (role: Role) => {
    return request.post('/api/role', role);
  },
  removeRole: (id: string) => {
    return request.delete(`/api/role/${id}`);
  },
  updateRole: (role: Role) => {
    return request.put(`/api/role`, role);
  },
  getAllMenus: () => {
    return request.get<Menu[]>(`/api/menu/list`);
  },
  getRoleMenus(roleId: string) {
    return request.get<string[]>('/api/role/menu/list', {
      params: {id: roleId},
    });
  },
  setRoleMenus(checkedKeys: string[], roleId: string) {
    return request.post('/api/role/alloc/menu', {
      menuIds: checkedKeys,
      roleId: roleId,
    });
  },
};

export default roleService;
