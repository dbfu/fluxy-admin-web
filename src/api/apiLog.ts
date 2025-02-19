// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 编辑 PUT /api-log/ */
export async function api_log_edit(
  body: API.ApiLogDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/api-log/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建 POST /api-log/ */
export async function api_log_create(
  body: API.ApiLogDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/api-log/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询 GET /api-log/${param0} */
export async function api_log_getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiLogGetByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api-log/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 DELETE /api-log/${param0} */
export async function api_log_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiLogRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/api-log/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查看请求body参数 GET /api-log/body */
export async function api_log_getBodyData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiLogGetBodyDataParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api-log/body", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询全部 GET /api-log/list */
export async function api_log_list(options?: { [key: string]: any }) {
  return request<any>("/api-log/list", {
    method: "GET",
    ...(options || {}),
  });
}

/** 分页查询 GET /api-log/page */
export async function api_log_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiLogPageParams,
  options?: { [key: string]: any }
) {
  return request<API.ApiLogPageVO>("/api-log/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看请求query参数 GET /api-log/query */
export async function api_log_getQueryData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiLogGetQueryDataParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api-log/query", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查看响应结果 GET /api-log/result */
export async function api_log_getResultData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.apiLogGetResultDataParams,
  options?: { [key: string]: any }
) {
  return request<any>("/api-log/result", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
