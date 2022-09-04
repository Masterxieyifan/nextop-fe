/*
 * @Author: lingyong.zeng
 * @Date: 2021-12-03 17:17:17
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-05-30 09:53:58
 * @Description: 
 * @FilePath: /@nextop/nextop-http/src/core/upload.js
 */
import axios from 'axios';
import { getAuthorization } from '@master_vantop/nextop-core';
import { VUE_APP_BASE_API_GW } from '../config/settings';

let instance = axios.create({ baseURL: VUE_APP_BASE_API_GW, });

export const comonUpLoadInstance = instance;

/**
 *@params {文件下载的请求参数}
 *@url {请求url不需要考虑网关gw自动拼接}
 *@downFileName {自定义下载的文件名称}
 *@msg {下载成功之后的提示}
 *@cb {回调函数}
 *@method {请求格式}
 */
export async function comonUpLoad(url, params) {
    instance.defaults.crossDomain = true;
	instance.defaults.withCredentials = true;

    Object.assign(instance.defaults.headers, getAuthorization());

    instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    return instance({
        url: url,
        data: params,
        method: 'post',
    });
}
