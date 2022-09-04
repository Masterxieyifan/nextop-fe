/*
 * @Author: hongdong.liao
 * @Date: 2021-01-05 16:59:25
 * @LastEditors: hongdong.liao
 * @LastEditTime: 2021-01-29 16:36:42
 * @FilePath: /nextop/packages/@nextop/nextop-http/src/utils/http.js
 * @description 基于./Axios的请求封装
 */

import Axios from './axios' // 导入Axios类
import { _httpType } from "../config/settings" // 导入配置项

export default class Http {
  /**
   *
   * @param {Object} axios 外部axios实例 无特殊情况不要使用此参数; 如果传入则表示使用自定义axios实例，后续参数将不会产生作用
   * @param {Object} axiosOptions Axios.create
   * @description retry:Number 请求失败自动重连次数 默认2
   * @description retryDelay:Number 请求失败自动重连时间间隔 默认1000ms
   * @description withCredentials:Boolean 开启请求跨域 默认true
   * @description headers:Object 请求头配置 默认"Content-Type": "application/json;charset=UTF-8"
   * @description timeout:Number 请求超时时间 默认5000
   * @description baseURL:String 请求地址前缀 默认''
   * @description successCode:Number //废弃 后台请求成功状态码，默认200 将会把所有非200的请求回调归入reject
   * @description expand:Object 其他需要扩展的配置项 other
   * @param {Function} reqInterceptSuccess 非必填 请求拦截器成功回调，必须返回一个config对象
   * @param {Function} respInterceptSuccess 非必填 响应拦截器成功回调，必须返回一个response对象
   * @param {Function} respInterceptError 非必填 响应拦截器失败回调，必须返回一个response对象
   */
  constructor({ axios, axiosOptions, reqInterceptSuccess, respInterceptSuccess, respInterceptError } = {}) {
    this.__http__ = axios || Axios.create(axiosOptions, reqInterceptSuccess, respInterceptSuccess, respInterceptError);
  }

  /**
   * get方法请求
   * @param url:String 请求地址
   * @param params:Object 即将与请求一起发送的 URL 参数
   * @param expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */
  get(url, params, expand) {
    return Axios.axios({ url, params, ...expand, method: _httpType.GET });
  }

  /**
   * post方法请求
   * @param url:String 请求地址
   * @param data:Object 作为请求主体被发送的数据
   * @param expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */
  post(url, data, expand) {
    return Axios.axios({ url, data, ...expand, method: _httpType.POST })
  }

  /**
   * post方法请求，以url形式传参
   * @param url:String 请求地址
   * @param params:Object 即将与请求一起发送的 URL 参数
   * @param expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */
  postQuery(url, params, expand) {
    return Axios.axios({ url, params, ...expand, method: _httpType.POST })
  }

  /**
   * 执行多个并发请求
   * @param {Array} list axios Promise 对象
   */
  all(list) {
    return Axios.all(list)
  }

  /**
   * delete方法请求
   * @param url:String 请求地址
   * @param params:Object 即将与请求一起发送的 URL 参数
   * @param expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */
  delete(url, params, expand) {
    return Axios.axios({ url, params, ...expand, method: _httpType.DELETE })
  }

  /**
   * delete方法请求，以url形式传参
   * @param url:String 请求地址
   * @param data:Object 作为请求主体被发送的数据
   * @param expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */
  deletePayload(url, data, expand) {
    return Axios.axios({ url, data, ...expand, method: _httpType.DELETE })
  }

  /**
   * put方法请求
   * @param url:String 请求地址
   * @param data:Object 作为请求主体被发送的数据
   * @param expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */
  put(url, data, expand) {
    return Axios.axios({ url, data, ...expand, method: _httpType.PUT })
  }

  /**
   * put方法请求，以url形式传参
   * @param url:String 请求地址
   * @param params:Object 即将与请求一起发送的 URL 参数
   * @param expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */
  putQuery(url, params, expand) {
    return Axios.axios({ url, params, ...expand, method: _httpType.PUT })
  }

  /**
   * patch方法请求
   * @param {Object} options
   * @description url:String 请求地址
   * @description data:Object 作为请求主体被发送的数据
   * @description expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */
  patch(url, data, expand) {
    return Axios.axios({ url, data, ...expand, method: _httpType.PATCH })
  }

    /**
   * 通用请求方法
   * @param {Object} options
   * @description url:String 请求地址
   * @description params:Object 即将与请求一起发送的 URL 参数
   * @description data:Object 作为请求主体被发送的数据
   * @description instance:Object 外部传入的axios实例，默认使用内部创建，无特殊需求不得在外部创建多余实例
   * @description expand:Object 扩展对象，其他不常用的axios(options)配置项放在expand字段传入，key值和axios文档一致
   */

  request(options) {
    return Axios.axios(options)
  }
}

