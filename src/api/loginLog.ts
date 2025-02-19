// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 编辑 PUT /login-log/ */
export async function login_log_edit(
  body: API.LoginLogDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/login-log/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建 POST /login-log/ */
export async function login_log_create(
  body: API.LoginLogDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/login-log/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询 GET /login-log/${param0} */
export async function login_log_getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginLogGetByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/login-log/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 DELETE /login-log/${param0} */
export async function login_log_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginLogRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/login-log/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询全部 GET /login-log/list */
export async function login_log_list(options?: { [key: string]: any }) {
  return request<API.LoginLogVO>("/login-log/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询 GET /login-log/page */
export async function login_log_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.loginLogPageParams,
  options?: { [key: string]: any }
) {
  return request<any>("/login-log/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
