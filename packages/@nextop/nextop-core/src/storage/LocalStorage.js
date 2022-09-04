/*
 * @Author: hongdong.liao
 * @Date: 2021-01-13 10:26:25
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-05-31 19:30:55
 * @FilePath: /@nextop/nextop-core/src/storage/LocalStorage.js
 */

import { BasicStorage, curdFn } from './BasicStorage';

class LocalStorage extends BasicStorage {
    static isEvent = false;
    static storageType = 'localStorage';
}

const _LocalStorage = new Proxy(LocalStorage, curdFn);

export {
    _LocalStorage as LocalStorage
};
