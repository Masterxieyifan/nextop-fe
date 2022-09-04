/*
 * @Author: hongdong.liao
 * @Date: 2021-01-07 11:05:35
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-06-27 14:00:44
 * @FilePath: /nextop-core/src/router/index.js
 */
import { isArray, isFunction, uniqBy } from '@master_vantop/vantop-util';
import { LocalStorage, } from '../storage/index';

// export function routerGo(href = '/', title = null, stateObj = {}) {
//     window.history.pushState(stateObj, title, href);
// }

// export function routerReplace(href = '/', title = null, stateObj = {}) {
//     window.history.replaceState(stateObj, title, href);
// }

export function routeMatch(
    data,
    routerBase,
    options = { 
        component: 'component',
        url: 'url',
        name: 'name',
        id: 'id',
        permissions: 'permissions' 
    },
    errorCb
) {
    if (!isArray(data)) return [];
    const routerBox = [];
    const urlPrefix = `${routerBase}/`;

    // 从扁平化菜单数据筛选出所有以routerBase开头的路由，即为当前应用的所有菜单路由，如: /goods/bom-manage/index...
    ({ menus: data = [] } = LocalStorage.getFlatLastMenuUrl() || {});
    const flData = data.filter(i => i.url.startsWith(urlPrefix));

    routerMapFile(flData);

    function routerMapFile(data) {
        if (!isArray(data)) {
            throw new Error('路由处理数据异常');
        }

        data = uniqBy(data, 'url');
        data.forEach(item => {
            let _url = item[options.url];
            _url = _url.replace(routerBase, '');
            if (_url) {
                try {
                    let routerItem = {
                        path: _url, // 路由路径名
                        name: item[options.name],
                        meta: {
                            componentName: item.componentName || '',
                            keepAlive: !!item.isCached,
                        },
                        component: () => import(/* webpackChunkName: "[request]" */`@/views${_url}.vue`) // 路由映射真实视图路径
                    };

                    routerBox.push(routerItem);
                } catch (err) {
                    if (isFunction(errorCb)) {
                        errorCb();
                        return;
                    }
                    console.log('err', err);
                }
            }
        });
    }
    return routerBox;
}
