/*
 * @Author: hongdong.liao
 * @Date: 2021-01-05 16:57:40
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-06-27 13:58:22
 * @FilePath: /nextop-core/src/index.js
 */
// import DataType from "./utils/type"
import Time from "./utils/time"

export * from './app/setup';
export * from './app/registerSubApp';
export * from './router/index';
export * from "./storage/index"
export * from "./utils/array"
export * from "./utils/validate"
export * from "./utils/event"
export * from "./utils/utils"
export * from "./utils/router"
export * from './utils/flatRoute';
export * from './utils/assets';
export * from './utils/user';
export * from './utils/auth';
export * from './utils/browser';
export * from './vuex/index';
export * from './directives/index';

export * from './lang/index';

export * from '../mixins/index';

export {
    // Storage,
    // DataType,
    Time,
}
