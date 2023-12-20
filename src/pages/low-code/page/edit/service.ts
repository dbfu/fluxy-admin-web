import request from '@/request';

export default {
  queryVersionById(id: string) {
    return request.get<any>(`/api/menu/lowcode/version/${id}`);
  },
  updateVersion(data: any) {
    return request.put<any>(`/api/menu/lowcode/version`, data);
  },
  getLatestVersionByMenuId(menuId: string) {
    return request.get<any>(`/api/menu/lowcode/version/latest`, {
      params: {menuId},
    });
  },
  createNewVersion(data: any) {
    return request.post<any>(`/api/menu/lowcode/version`, data);
  }
};
