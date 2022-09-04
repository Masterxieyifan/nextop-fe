import {
  getPersonalConfig,
  setPersonalConfig,
  deletePersonalConfig,
  updatePersonalConfig,
} from './api';

function getPath() {
    if (!window) {
        throw new Error('[Func Error] getPath Func must run in an browser environment! RemoteStorage.js');
    }
    // router改为 histroy 模式
    const { pathname, } = window.location;
    // const _path = hash.slice(hash.indexOf('#') + 1);
    return pathname;
}

export class StorageService {
    static _set(params) {
        return new Promise((res, rej) => {
            setPersonalConfig(params).then(() => res(true)).catch(err => rej(err));
        });
    }

    static _update(params) {
        return new Promise((res, rej) => {
            updatePersonalConfig(params).then(() => res(true)).catch(err => rej(err));
        });
    }

    static _remove(params) {
        return new Promise((res, rej) => {
            deletePersonalConfig(params).then(() => res(true)).catch(err => rej(err));
        });
    }

    static _get(params) {
        return new Promise((res, rej) => {
            getPersonalConfig(params).then(result => {
                let _content = null;

                if (Array.isArray(result) && result.length) {
                    const [ { content } = {} ] = result;
                    if (typeof content === 'string' && content.length > 0) {
                      if (
                        content.includes('"') ||
                        content.includes('[') ||
                        content.includes('{')
                      ) {
                        _content = JSON.parse(content)
                      }
                    }
                }
                res(_content);
            }).catch(err => rej(err));
        });
    }

    static _setContentToStr(content) {
        const _type = Object.prototype.toString.call(content).slice(8, -1);
        let _content;
        switch (_type) {
        case 'Object':
        case 'Array':
            _content = JSON.stringify(content);
            break;
        case 'Function':
            _content = content.toString();
            break;
        case 'String':
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
            path: getPath(),
        };
        return this._set(params);
    }

    static getItem(key) {
        const params = {
            configKey: key,
            path: getPath(),
        };
        return this._get(params);
    }

    static updateItem(key, val) {
        let _content = this._setContentToStr(val);
        const params = {
            configKey: key,
            content: _content,
            path: getPath(),
        };
        return this._update(params);
    }

    static removeItem(key) {
        const params = {
            configKeys: key,
            path: getPath(),
        };
        return this._remove(params);
    }
}
