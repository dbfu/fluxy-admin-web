// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 更新用户 PUT /user/ */
export async function user_update(
  body: API.UserDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/user/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建用户 POST /user/ */
export async function user_create(
  body: API.UserDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id查询 GET /user/${param0} */
export async function user_getById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userGetByIdParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/${param0}`, {
    method: "GET",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除 DELETE /user/${param0} */
export async function user_remove(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userRemoveParams,
  options?: { [key: string]: any }
) {
  const { id: param0, ...queryParams } = params;
  return request<any>(`/user/${param0}`, {
    method: "DELETE",
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页查询 GET /user/page */
export async function user_page(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userPageParams,
  options?: { [key: string]: any }
) {
  return request<API.UserPageVO>("/user/page", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 发送邮箱验证码 POST /user/send/email/captcha */
export async function user_sendEmailCaptcha(
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  return request<any>("/user/send/email/captcha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
