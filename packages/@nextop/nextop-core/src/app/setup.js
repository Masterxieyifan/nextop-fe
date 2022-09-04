/*
 * @Author: hongdong.liao
 * @Date: 2021-01-29 14:49:03
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-06-29 14:56:51
 * @FilePath: /nextop-core/src/app/setup.js
 */
import Vue from 'vue'
import VueRouter from "vue-router";
import { LocalStorage } from '../storage';
const { __POWERED_BY_QIANKUN__, __INJECTED_PUBLIC_PATH_BY_QIANKUN__ } = window;

export const loadPublicPath = () => {
    if (__POWERED_BY_QIANKUN__) {
        // eslint-disable-next-line no-undef
        __webpack_public_path__ = __INJECTED_PUBLIC_PATH_BY_QIANKUN__;
    }
}

/**
* @name 子应用实例化函数
* @param {Object} props param0 qiankun将用户添加信息和自带信息整合，通过props传给子应用
* @description {Array} routes 主应用请求获取注册表后，从服务端拿到路由数据
* @description {String} 子应用路由前缀 主应用请求获取注册表后，从服务端拿到路由数据
*/
export const renderSubchild = ({ routes, routerBase, container, subappKey, store, parentStore, mountPoint, i18n, } = {}) => {
    const appName = subappKey.slice(5);

    let instance = null;
    const router = new VueRouter({
        mode: 'history',
        base: routerBase,
        routes: routes,
    })
    router.onError(error => {
        // const loadError = /^[\s\S]*Loading\s?chunk\s?\S+\s?failed[\s\S]*$/;
        const loadError = /^([\s\S]*)?Loading\s(.*?\s)?chunk\s(.*)?\sfailed\./;
        // const noModule = /^Cannot\s?find\s?module\s?\'\S+\'$/
        const paramsData = {
            errorType: 'NOT_FOUND_404',
            errorMsg: `nextop-web-${location.pathname.split('/').length > 0 ? location.pathname.split('/')[1] : location.pathname.split('/')[0] }服务${error.message}资源不存在, 已做重定向处理`|| JSON.stringify(error)
        };
        // if (noModule.test(error.message)) {
        //     // console.log('未找到对应资源', location.href, router.history.pending.fullPath);
        //     window.history.pushState(null, null, '/')
        // } else  
        if (loadError.test(error.message)){
            // console.log('服务器版本已更新，正在刷新本地缓存，请稍后...');
            const { base, pending: { fullPath }} = router.history;
            window.location.href = base + fullPath;
        } else {
            window._ERROR_SENTRY && window._ERROR_SENTRY.postSentry(paramsData)
            // window.location.reload();
        }
    });
    /*
        set subapplication's routes
        will need when add tag
    */
    LocalStorage.setSubapplicationRoutes(routes.map(i => {
        const prefix = i.path.slice(0, routerBase.length + 1);
        let path = i.path;
        if (prefix !== `${routerBase}/`) {
            path = `${routerBase}${path}`;
        }
        return {
            ...i,
            path,
        }
    }));
    /*
     * set all routes for 404
    */
    Vue.prototype.$parentStore = parentStore;
    instance = new Vue({
        router,
        store,
        i18n,
        render: h => h(mountPoint)
    }).$mount(container ? container.querySelector(subappKey) : subappKey)
    return { originInstance: instance, originRouter: router };
};
