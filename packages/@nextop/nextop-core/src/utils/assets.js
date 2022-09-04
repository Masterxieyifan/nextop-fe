/*
 * @Author: lingyong.zeng
 * @Date: 2021-04-30 18:40:04
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-06-27 14:11:52
 * @Description: 
 * @FilePath: /nextop-core/src/utils/assets.js
 */
// import variables from '../../styles/variables.scss';

/**
 * 获取静态服务器地址, 在styles/variables.scss配置
 */

const $assets = '//cdn-nextop-web-static.nextop.com/nextop-erp-micro';

export const getAssetsUrl = () => {
    return String($assets).replace(/"/g, '');
}