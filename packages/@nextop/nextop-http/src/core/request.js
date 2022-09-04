import axios from 'axios';
import { LocalStorage, logout } from '@nextop/nextop-core';
import { VUE_APP_BASE_API_GW } from '../config/settings';
import NProgress from 'nprogress';
import { message as Message, } from '../utils/resetMessage';

// NProgress 配置
NProgress.configure({ showSpinner: false, });

export let httpRequestInstance = axios.create({
    baseURL: VUE_APP_BASE_API_GW || '',
    timeout: 30 * 1000,
    method: 'post',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
})

// 请求拦截器
httpRequestInstance.interceptors.request.use(function (config) {
    // 开启 progress bar
    NProgress.start();

    // 设置token
    const token = LocalStorage.getToken();
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/*
    java后端返回异常码表：

    操作成功
    SUCCESS("10000", "success"),

    请求参数错误
    INVALID_PARAM("30000", "invalid.param"),

    业务异常
    BUSINESS_ERROR("40000", "unexpected.business.error"),

    未登陆或登陆过期
    UNAUTHORIZED("40001", "request.unauthorized"),

    访问拒绝无权限
    FORBIDDEN("40003", "request.not.permitted"),

    服务器异常
    INTERNAL_SERVER_ERROR("50000", "server.internal.error")

    前端处理原则：
    1.登录超时跳转登录页面
    2.responseCode !== 10000 的返回，默认提示 message，并reject 整个response，业务需在 catch 中处理业务异常
    3.responseCode === 10000 的返回，表示接口正常返回，返回整个response，业务自行取数据
*/

// 响应拦截器
httpRequestInstance.interceptors.response.use(function (response) {
    //关闭 progress bar
    NProgress.done();

    // 更新 Token
    // 如果请求头返回了 Authorization 信息，则表示 token 需要更新
    let { authorization } = response.headers;
    if (authorization) {
      const token = String(authorization).replace('Bearer ', '');
      LocalStorage.setToken(token);
      Vue?.prototype?.$parentStore?.dispatch('appstore/setToken', token);
    }
    let { status, data: res } = response;
    let { requestId, responseCode, message, subErrorCode, data } = res;

    /**
     * 未登陆或登陆过期
     * UNAUTHORIZED("40001", "request.unauthorized"),
     */
    if (responseCode === '40001') {
        logout();
        Message.error(message);
        routerGo('/login');
        return Promise.reject(new Error(message));
    }

    if (responseCode !== '10000') {
        Message.error(message);
        return Promise.reject(res);
    }

    return res;
}, function (error) {
    NProgress.done();
    return Promise.reject(new Error(error));
});


export const httpRequest = {
    /**
     * 传参方式
     * @param {String} url 请求地址
     * @param {Object} params[data] 请求参数
     * @param {Object} config 请求配置，支持配置：https://axios-http.com/zh/docs/req_config
   */
    get: (url, params, config) => httpRequestInstance.request({ url: url, params, method: 'get', ...config }),

    post: (url, data, config) => httpRequestInstance.request({ url, data, method: 'post', ...config }),

    postQuery: (url, params, config) => httpRequestInstance.request({ url, params, method: 'post', ...config }),

    delete: (url, params, config) => httpRequestInstance.request({ url, params, method: 'delete', ...config }),

    deletePayload: (url, data, config) => httpRequestInstance.request({ url, data, method: 'delete', ...config }),

    put: (url, data, config) => httpRequestInstance.request({ url, data, method: 'put', ...config }),

    putQuery: (url, params, config) => httpRequestInstance.request({ url, params, method: 'put', ...config }),

    patch: (url, data, config) => httpRequestInstance.request({ url, data, method: 'patch', ...config }),

    request: (config) => httpRequestInstance.request(config),
}
