// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 更新角色 PUT /role/ */
export async function role_update(
  body: API.RoleDTO,
  options?: { [key: string]: any }
) {
  return request<API.RoleEntity>("/role/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建角色 POST /role/ */
export async function role_create(
  body: API.RoleDTO,
  options?: { [key: string]: any }
) {
  return request<API.RoleEntity>("/role/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /role/${param0} */
export async function role_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/role/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 角色分配菜单 POST /role/alloc/menu */
export async function role_allocMenu(
  body: API.RoleMenuDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/role/alloc/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取角色列表 GET /role/list */
export async function role_list(options?: { [key: string]: any }) {
  return request<API.RoleEntity[]>("/role/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 根据角色id获取菜单id列表 GET /role/menu/list */
export async function role_getMenusByRoleId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.roleGetMenusByRoleIdParams,
  options?: { [key: string]: any }
) {
  return request<any>("/role/menu/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取角色列表 GET /role/page */
export async function role_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.rolePageParams,
  options?: { [key: string]: any }
) {
  return request<API.RolePageVO>("/role/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
