/*
 * @Author: lingyong.zeng
 * @Date: 2022-05-18 17:06:03
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-06-14 17:20:50
 * @Description: 
 * @FilePath: /nextop/packages/@nextop/nextop-core/src/utils/auth.js
 */
import { LocalStorage, } from '../storage/LocalStorage';

// 获取token
export function getToken() {
    return LocalStorage.getToken();
}

/**
 * 设置token
 * @param {*} token
 * @returns
 */
export function setToken(token) {
    return LocalStorage.setToken(token);
}

/**
 * 删除token
 * @returns
 */
export function removeToken() {
    return LocalStorage.removeToken();
}

/**
 * 获取头部认证信息
 * @returns
 */
export function getAuthorization() {
    const token = LocalStorage.getToken();
    const sessionId = LocalStorage.getSessionId(sessionId);

    const headSet = {
        'x-ca-language': LocalStorage.getLanguage() === 'en' ? 'en_US' : 'zh_CN',
        'x-ca-reqid': Math.random() + '-' + Date.now(),
        'x-ca-reqtime':  Date.now(),
    };
    if (token) {
        headSet['Authorization'] = 'Bearer ' + token;
    }
    if (sessionId) {
        headSet['saToken'] = sessionId;
    }
    return headSet;
}