/*
 * @Author: hongdong.liao
 * @Date: 2021-06-30 09:26:56
 * @LastEditors: hongdong.liao
 * @LastEditTime: 2021-06-30 16:50:50
 * @FilePath: /nextop/packages/@nextop/nextop-core/src/storage/RemoteStorage.js
 */
const getPathname = () => {
    if (!window) {
        throw new Error(
            "[Func Error] getPathname Func must run in an browser environment! RemoteStorage.js"
        );
    }
    const { pathname } = window.location;
    return pathname;
};

export class RemoteStorage {
    constructor() {
        if (
            !window?.RemoteStorageApi ||
            !Object.keys(window.RemoteStorageApi).length
        ) {
            throw new Error(
                "[Func Error] This method must have a corresponding api！RemoteStorage.js"
            );
        }
    }
    static _set(params) {
        return new Promise((resolve, reject) => {
            if (window?.RemoteStorageApi?.setPersonalConfig) {
                window.RemoteStorageApi.setPersonalConfig(params)
                    .then(() => resolve(true))
                    .catch((err) => reject(err));
            }
        });
    }
    static _update(params) {
        return new Promise((resolve, reject) => {
            if (window?.RemoteStorageApi?.updatePersonalConfig) {
                window.RemoteStorageApi.updatePersonalConfig(params)
                    .then(() => resolve(true))
                    .catch((err) => reject(err));
            }
        });
    }
    static _remove(params) {
        return new Promise((resolve, reject) => {
            if (window?.RemoteStorageApi?.deletePersonalConfig) {
                window.RemoteStorageApi.deletePersonalConfig(params)
                    .then(() => resolve(true))
                    .catch((err) => reject(err));
            }
        });
    }
    static _get(params) {
        return new Promise((resolve, reject) => {
            if (window?.RemoteStorageApi?.getPersonalConfig) {
                window.RemoteStorageApi.getPersonalConfig(params)
                    .then((result) => {
                        let _result = result;
                        if (Array.isArray(result) && result.length > 0) {
                            _result = result?.[0];
                            const { content } = _result;
                            try {
                                const _content = JSON.parse(content);
                                resolve(_content);
                            } catch (e) {
                                resolve(content);
                            }
                        }
                    })
                    .catch((err) => reject(err));
            }
        });
    }
    static _setContentToStr(content) {
        const _type = Object.prototype.toString.call(content).slice(8, -1);
        let _content;
        switch (_type) {
            case "Object":
            case "Array":
                _content = JSON.stringify(content);
                break;
            case "Function":
                _content = content.toString();
                break;
            case "String":
            default:
                _content = content;
                break;
        }
        return _content;
    }

    static setItem(key, val) {
        let _content = this._setContentToStr(val);
        const params = {
            configKey: key,
            content: _content,
            path: getPathname(),
        };
        return this._set(params);
    }

    static getItem(key) {
        const params = {
            configKey: key,
            path: getPathname(),
        };
        return this._get(params);
    }

    static updateItem(key, val) {
        let _content = this._setContentToStr(val);
        const params = {
            configKey: key,
            content: _content,
            path: getPathname(),
        };
        return this._update(params);
    }

    static removeItem(key) {
        const params = {
            configKeys: key,
            path: getPathname(),
        };
        return this._remove(params);
    }
}
