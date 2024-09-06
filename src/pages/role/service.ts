import { PageData, PageParams } from '@/interface';
import request from '@/request';
import { toPageRequestParams } from '@/utils/utils';
import { Menu } from '../menu/service';

export interface Role {
  id?: string;
  name: string;
  code: string;
  menuIds?: string[];
}


const roleService = {
  getRoleListByPage: async (
    params: PageParams & Partial<Role>,
  ) => {
    return request.get<PageData<Role>>('/api/role/page', {
      params: toPageRequestParams(params),
    });
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
      params: { id: roleId },
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
