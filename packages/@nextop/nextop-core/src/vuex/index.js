/*
 * @Author: hongdong.liao
 * @Date: 2021-03-02 11:02:04
 * @LastEditors: hongdong.liao
 * @LastEditTime: 2021-03-02 11:03:15
 * @FilePath: /nextop/packages/@nextop/nextop-core/src/vuex/index.js
 * @Description: 主应用的getters
 */
export const mapParentGetters = function (...args) {
    let namespace = '';
    let mapObj;
    const getters = {};
    if (typeof args[0] === 'boolean') {
        namespace = args[0];
        mapObj = args[1];
    } else {
        mapObj = args[0];
    }

    if (Array.isArray(mapObj)) {
        for (let key of mapObj) {
            getters[key] = function () {
                return this.$parentStore.getters[namespace + key];
            };
        }
    } else {
        Object.getOwnPropertyNames(mapObj).forEach(key => {
            const newKey = mapObj[key];
            getters[newKey] = function () {
                return this.$parentStore.getters[namespace + key];
            };
        });
    }
    return getters;
};
