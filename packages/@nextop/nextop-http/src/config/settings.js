/*
 * @Author: hongdong.liao
 * @Date: 2021-01-05 16:59:25
 * @LastEditors: 蔡远程
 * @LastEditTime: 2021-10-28 18:23:06
 * @FilePath: /nextop-http/src/config/settings.js
 */
export const _httpOptions = {
  baseURL: '//api.nextop.com', // api的base_url
  retry: 3,
  retryDelay: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
  timeout: 5000, // request timeout
  method: 'post' // 默认请求方法
}

// http类型
export const _httpType = {
  DELETE: 'delete',
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch'
}

export const HTTP_METHOD = _httpType

// 后台状态码
export const _httpCode = {
  ok: 200,
  err: 10000,
  noAuth: 401
}

export const VUE_APP_BASE_API_GW = '//api.nextop.com';