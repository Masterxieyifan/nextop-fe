/*
 * @Author: hongdong.liao
 * @Date: 2021-02-20 10:28:49
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-05-24 15:26:43
 * @FilePath: /nextop-core/src/utils/user.js
 */
import { LocalStorage, SessionStorage } from '../storage/index';

/**
 * 退出登录
 */
function logout() {
    LocalStorage.clear();
    SessionStorage.clear();
}

// 处理因token不存在/接口code码导致需要登出时（前置钩子）
function handleExceptionLogout({ classifyCode }) {
    // 提取 url 得出：/goods/bom-manage?id=10#name=zly
    const redirectUrl = '/' + location.href.split('://')[1].split('/').slice(1).join('/');
    const redirectData = {
        redirectUrl,                // 退出前url
        classifyCode,              // 退出前系统
    }

    // 如果记录的重定向是登陆页，毫无意义
    if (redirectUrl.startsWith('/login')) {
        LocalStorage.removeRedirect();
    }

    // 该数据用于重新登录成功跳转
    LocalStorage.setRedirect(redirectData);

    // 跳转登录且带上reloaded标识别
    location.replace('/login#reloaded');
}

export {
    logout,
    handleExceptionLogout
}
