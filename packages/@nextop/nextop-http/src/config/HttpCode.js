/*
 * @Author: hongdong.liao
 * @Date: 2021-01-12 10:42:55
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2021-05-06 09:01:12
 * @FilePath: /nextop/packages/@nextop/nextop-http/src/config/HttpCode.js
 */

let httpCode;
(function (HttpCode) {
    httpCode[httpCode["e400"] = 400] = "e400";
    httpCode[httpCode["e401"] = 401] = "e401";
    httpCode[httpCode["e403"] = 403] = "e403";
    httpCode[httpCode["e405"] = 405] = "e405";
    httpCode[httpCode["e408"] = 408] = "e408";
    httpCode[httpCode["e500"] = 500] = "e500";
    httpCode[httpCode["e501"] = 501] = "e501";
    httpCode[httpCode["e502"] = 502] = "e502";
    httpCode[httpCode["e503"] = 503] = "e503";
    httpCode[httpCode["e504"] = 504] = "e504";
    httpCode[httpCode["e505"] = 505] = "e505";
})(httpCode || (httpCode = {}));

export const HttpCode = httpCode;

export class StatusCode {
  static 400 = '请求无效';
  static 401 = '由于长时间未操作，登录已超时，请重新登录';
  static 403 = '拒绝访问';
  static 405 = '未授权';
  static 408 = '请求超时';
  static 500 = '服务器内部错误';
  static 501 = '服务未实现';
  static 502 = '网关错误';
  static 503 = '服务不可用';
  static 504 = '网关超时';
  static 505 = 'HTTP版本不受支持';
}
