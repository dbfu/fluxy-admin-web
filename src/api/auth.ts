// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 获取验证码 GET /auth/captcha */
export async function auth_getImageCaptcha(options?: { [key: string]: any }) {
  return request<API.CaptchaVO>("/auth/captcha", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取当前用户信息 GET /auth/current/user */
export async function auth_getCurrentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUserVO>("/auth/current/user", {
    method: "GET",
    ...(options || {}),
  });
}

/** 登录 POST /auth/login */
export async function auth_login(
  body: API.LoginDTO,
  options?: { [key: string]: any }
) {
  return request<API.TokenVO>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /auth/logout */
export async function auth_logout(options?: { [key: string]: any }) {
  return request<any>("/auth/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /auth/publicKey */
export async function auth_getPublicKey(options?: { [key: string]: any }) {
  return request<any>("/auth/publicKey", {
    method: "GET",
    ...(options || {}),
  });
}

/** 刷新token POST /auth/refresh/token */
export async function auth_refreshToken(
  body: API.RefreshTokenDTO,
  options?: { [key: string]: any }
) {
  return request<API.TokenVO>("/auth/refresh/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /auth/reset/password */
export async function auth_resetPassword(
  body: API.ResetPasswordDTO,
  options?: { [key: string]: any }
) {
  return request<any>("/auth/reset/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /auth/send/reset/password/email */
export async function auth_sendResetPasswordEmail(
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  return request<any>("/auth/send/reset/password/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
