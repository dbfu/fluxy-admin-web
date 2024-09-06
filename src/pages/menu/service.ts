import { PageData, PageParams } from '@/interface';
import request from '@/request';
import { toPageRequestParams } from '@/utils/utils';

export interface Menu {
  parentId?: string | null;
  name?: string;
  icon?: string;
  type?: number;
  route?: string;
  filePath?: string;
  orderNumber?: number;
  url?: string;
  show?: boolean;
  id?: string;
  _loaded_?: boolean;
  hasChild?: boolean;
  children?: Menu[] | null;
  apis?: { method: string, path: string }[],
}

export interface Api {
  type: string;
  title: string;
  prefix: string;
  path: string;
  children: {
    method: string;
    path: string;
    title: string;
    type: string;
  }[];
}

export interface MenuApi {
  id?: string;
  menuId: string;
  path: string;
  method: string;
}

const menuService = {
  getMenusByPage: async (
    params: PageParams
  ) => {
    return request.get<PageData<Menu>>('/api/menu/page', {
      params: toPageRequestParams(params)
    });
  },
  addMenu: (menu: Menu) => {
    return request.post('/api/menu', menu);
  },
  removeMenu: (id: string) => {
    return request.delete(`/api/menu/${id}`);
  },
  updateMenu: (menu: Menu) => {
    return request.put(`/api/menu`, menu);
  },
  getChildren: (parentId: string) => {
    return request.get<Menu[]>('/api/menu/children', { params: { parentId } });
  },
  getApiList: () => {
    return request.get<Api[]>('/api/api/list');
  },
  getAllocApis: (menuId: string) => {
    return request.get<MenuApi[]>('/api/menu/alloc/interface/list', {
      params: { menuId },
    });
  },
};

export default menuService;
