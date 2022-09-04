/*
 * @Author: lingyong.zeng
 * @Date: 2022-05-12 09:41:47
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-05-12 15:52:23
 * @Description: 
 * @FilePath: /nextop/packages/@nextop/nextop-core/src/storage/BasicStorage.js
 */
import _curry from 'lodash.curry';
import _snakeCase from 'lodash.snakecase';
import { LOCAL_STORAGE_KEYS, SESSION_STORAGE_KEYS } from './keys';

// 缓存键名前缀
const prefix = 'nextop-micro:';

// LocalStorage｜SessionStorage 基础类
export class BasicStorage {
    static _set(key, val) {
        val = val ?? '';
        return window[this.storageType].setItem(
            `${prefix}${key}`, 
            JSON.stringify(val)
        );
    }

    // original: boolean (是否原始数据)
    static _get(key, original = false) {
        const item = window[this.storageType].getItem(`${prefix}${key}`);
        if ( (item ?? '') !== '') {
            return original ? item : JSON.parse(item);
        } else {
            return null;
        }
    }

    static _remove(key) {
        return window[this.storageType].removeItem(`${prefix}${key}`);
    }

    static _clear() {
        window[this.storageType].clear();
    }

    static _setByEvent(key, val, eventName) {
        const { isEvent, storageType } = this;
        if (!this.isEvent) {
            let originSetItem = window[storageType].setItem;
            window[storageType].setItem = function(key, val, eventName) {
                let setItemEvent = new Event(eventName);
                setItemEvent.newValue = val;
                window.dispatchEvent(setItemEvent);
                originSetItem.apply(this, arguments);
            }
            this.isEvent = true;
        }
        return window[storageType].setItem(
            `${prefix}${key}`, 
            JSON.stringify(val), 
            eventName
        );
    }
}

/* 增删减的对象代理，例：存储键 SESSION_ID
 * 通过 proxy 代理 LocalStorage.getSessionId | LocalStorage.setSessionId | LocalStorage.remove 等使用基础类 BasicStorage 方法
 */
export const curdFn = {
    get: function(target, propKey, receiver) {
        let attrValue, key;
        switch (true) {
            case propKey.endsWith('ByEvent'): 
                // 事件
                key = checkAndTransKey('event', propKey, target.storageType);
                attrValue = _curry(target._setByEvent)(key);
            break;
            case propKey.startsWith('set'):
                // 设置
                key = checkAndTransKey('set', propKey, target.storageType);
                attrValue = _curry(target._set)(key);
            break;
            case propKey.startsWith('get'):
                // 读取
                key = checkAndTransKey('get', propKey, target.storageType);
                attrValue = (...args) => target._get(key, ...args);
            break;
            case propKey.startsWith('remove'):
                // 删除
                key = checkAndTransKey('remove', propKey, target.storageType);
                attrValue = (...args) => target._remove(key, ...args);
            break;
            case propKey === 'clear':
                // 全部清除
                attrValue = target._clear;
            break;
            default:
                attrValue = Reflect.get(target, propKey, receiver);
            break;
        }
        return attrValue;
    }
}

/* 
 * 1. 校验curdFn的属性名是否与定义好的键名匹配
 * 2. 字符转换｜缓存中读取
 */
const LOCAL_KEY_CACHE = {};
const SESSION_KEY_CACHE = {};
export function checkAndTransKey(type, propKey, storageType) {
    let key;
    switch(type) {
        case 'event':
            key = propKey.slice(3, -7);
            break;
        case 'set':
        case 'get':
            key = propKey.slice(3);
            break;
        case 'remove':
            key = propKey.slice(6);
            break;
    }

    const isLocal = storageType === 'localStorage';
    const keyCache = isLocal ? LOCAL_KEY_CACHE : SESSION_KEY_CACHE;

    // 检测缓存中是否已有转化过的键，减少重复转化
    if (Reflect.has(keyCache, key)) {
        return keyCache[key];
    }

    // 驼峰大小写转化
    const keyStr = _snakeCase(key).toUpperCase();

    // 校验键名是否在预先指定的存储键名数据中
    const keyValids = isLocal ? LOCAL_STORAGE_KEYS : SESSION_STORAGE_KEYS;
    if (!Reflect.has(keyValids, keyStr)) {
        throw new Error(
            `class ${isLocal ? 'LocalStorage' : 'SessionStorage'} did not provide the ${propKey} method`
        );
    }

    return keyCache[key] = keyStr;
}