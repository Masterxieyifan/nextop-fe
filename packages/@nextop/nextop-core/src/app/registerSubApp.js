/*
 * @Author: lingyong.zeng
 * @Date: 2022-06-27 09:48:40
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-07-04 18:43:09
 * @Description:
 * @FilePath: /nextop-core/src/app/registerSubApp.js
 */

import Vue from 'vue';
import { renderSubchild } from './setup';
import { isFunction, isArray, upperFirst } from '@master_vantop/vantop-util';

let router = null;
let instance = null;
let parentStore = null;

function registerSubApp(subProps) {
    return {
        ...lifeCycle(subProps),
        render,
    };
}

function lifeCycle({
    name: microName,
    apis,
    store: microStore,
    routes: microRoutes,
    messages: microMessages,
    mountHook,
    unmountHook,
    el: microEl,
    routeMatch,
    components,
    filters,
    directives,
    __qiankun__,
    clearAxiosCancel
}) {
    return {
        async bootstrap() {
            //...
        },
        async mount(props) {
            parentStore = props.parentStore;
            parentStore.dispatch('appstore/setAppName', microName);
            render(
                {
                    microName,
                    microStore,
                    microRoutes,
                    microMessages,
                    microEl,
                    routeMatch,
                    __qiankun__,
                    clearAxiosCancel
                },
                props
            ); // 注册微应用实例化函数
            // 绑定子应用原型 api 挂载
            Vue.prototype[`$${microName}Api`] = apis;
            // 调用子应用mount钩子方法
            mountHook && isFunction(mountHook) && mountHook(instance);
        },
        async unmount() {
            // 移除事件监听
            instance.$off();
            // 移除全局mixin方法
            Vue.options.methods = null;
            // 销毁子应用全局组件、过滤器、指令
            if (isArray(components)) {
                components.forEach(name => delete Vue.options.components[name]);
            }
            if (isArray(filters)) {
                filters.forEach(name => delete Vue.options.filters[name]);
            }
            if (isArray(directives)) {
                directives.forEach(name => delete Vue.options.directives[name]);
            }
            /****************************/

            clearAxiosCancel();
            isFunction(instance.$destroy) && instance.$destroy();
            instance.$el && instance.$el.innerHTML && (instance.$el.innerHTML = '');
            Reflect.ownKeys(instance).forEach(key => key !== '$attrs' && key !== '$listeners' && Reflect.set(instance, key, null));
            Reflect.ownKeys(router).forEach(key => Reflect.set(instance, key, null));
            instance = null;
            router = null;
            parentStore = null;

            // 去除子应用原型 api 挂载
            delete Vue.prototype[`$${microName}Api`];

            // 调用子应用unmount钩子方法
            unmountHook && isFunction(unmountHook) && unmountHook();
        }
    }
}

async function render(
    { microName, microRoutes, microMessages, microStore, microEl, routeMatch, __qiankun__, clearAxiosCancel },
    { routes, routerBase, container, i18n, parentStore }) {

    // 等待 v2 接口逻辑处理完成，再进行路由匹配，否则拿不到相关数据
    const {
        state: { menu: { menuDataPromise } = ({} = {}) },
    } = parentStore || {};
    if (menuDataPromise) {
        try {
            await menuDataPromise;
        } catch (e) {
            console.error(e);
        }
    }
    /*** 以上仅CRM有（需测试是否需要）****/

    const macthRoutes = routeMatch(routes, routerBase);
    const fullMacth = [...macthRoutes, ...microRoutes];
    const routeBase = __qiankun__ ? routerBase : '/';
    const __routes = __qiankun__ ? fullMacth : [];
    Object.keys(microMessages).forEach(key => {
        i18n.mergeLocaleMessage(key, microMessages[key]);
    });
    const { originInstance, originRouter } = renderSubchild({
        routes: __routes,
        routerBase: routeBase,
        store: microStore,
        parentStore,
        container,
        i18n,
        subappKey: `#app-${microName}`,
        mountPoint: microEl
    });

    instance = originInstance;
    router = originRouter;

    router.beforeEach(async (to, from, next) => {
        if (to.path !== from.path) {
            // 取消未完成接口
            clearAxiosCancel();
        }

        // 主应用与子应用路由钩子同时调用，但子应用不依赖主应用路由钩子执行完成顺序
        const waitAppRefreshPromise = parentStore.state.appstore.waitAppRefresh;
        if (waitAppRefreshPromise) {
            const isGoOn = await waitAppRefreshPromise;
            if (isGoOn) {
                next();
            } else {
                return false;
            }
        }
    });
}

function registerGlobalComponents(
    requireComponent, Vue
) {
    const components = [];
    requireComponent.keys().forEach((fileName) => {
        const componentConfig = requireComponent(fileName);
        // 获取组件的 PascalCase 命名
        const componentName = upperFirst(
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        );
        components.push(componentName);
        Vue.component(
            componentName,
            componentConfig.default || componentConfig
        );
    });
    return components;
}

export {
    registerSubApp,
    registerGlobalComponents
};