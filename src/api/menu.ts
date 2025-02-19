// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 更新菜单 PUT /menu/ */
export async function menu_update(
  body: API.MenuDTO,
  options?: { [key: string]: any }
) {
  return request<API.MenuEntity>("/menu/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建一个菜单 POST /menu/ */
export async function menu_create(
  body: API.MenuDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/menu/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除一个菜单 DELETE /menu/${param0} */
export async function menu_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/menu/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 根据菜单查询已分配接口 GET /menu/alloc/api/list */
export async function menu_getAllocAPIByMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuGetAllocAPIByMenuParams,
  options?: { [key: string]: any }
) {
  return request<API.MenuApiEntity[]>("/menu/alloc/api/list", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据上级菜单查询子级菜单 GET /menu/children */
export async function menu_children(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuChildrenParams,
  options?: { [key: string]: any }
) {
  return request<API.MenuVO[]>("/menu/children", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询全量菜单 GET /menu/list */
export async function menu_list(options?: { [key: string]: any }) {
  return request<API.MenuVO[]>("/menu/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询菜单 GET /menu/page */
export async function menu_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.menuPageParams,
  options?: { [key: string]: any }
) {
  return request<API.MenuPageVO>("/menu/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
