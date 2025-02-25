// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 获取接口列表 GET /api/list */
export async function api_apiList(options?: { [key: string]: any }) {
  return request<API.ApiVO[]>("/api/list", {
    method: "GET",
    ...(options || {}),
  });
}
