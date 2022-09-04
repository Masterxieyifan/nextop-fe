/*
 * @Author: hongdong.liao
 * @Date: 2021-03-02 11:13:20
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-05-12 09:55:59
 * @FilePath: /nextop/packages/@nextop/nextop-core/src/storage/SessionStorage.js
 */
import { BasicStorage, curdFn } from './BasicStorage';

class SessionStorage extends BasicStorage {
    static storageType = 'sessionStorage';
}

const _SessionStorage = new Proxy(SessionStorage, curdFn);

export {
    _SessionStorage as SessionStorage
};
