/*
 * @Author: hongdong.liao
 * @Date: 2021-05-07 18:58:04
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-05-30 09:52:56
 * @FilePath: /@nextop/nextop-http/src/core/download.js
 */
import axios from 'axios';
import { getAuthorization} from '@nextop/nextop-core';
import { Message, } from 'element-ui';
import { VUE_APP_BASE_API_GW } from '../config/settings';

let instance = axios.create({ baseURL: VUE_APP_BASE_API_GW, });

export const comonDownLoadInstance = instance;

/**
 *@params {文件下载的请求参数}
 *@url {请求url不需要考虑网关gw自动拼接}
 *@downFileName {自定义下载的文件名称}
 *@msg {下载成功之后的提示}
 *@cb {回调函数}
 *@method {请求格式}
 */
export async function comonDownLoad(method, url, cb, params, downFileName, msg, needResultMsg = false) {
    instance.defaults.responseType = 'blob';
    instance.defaults.crossDomain = true;
	instance.defaults.withCredentials = true;

    Object.assign(instance.defaults.headers, getAuthorization());

    instance.defaults.headers.post['Content-Type'] = 'application/json';
    let outputFileName;
    return instance({
        url: url,
        data: params,
        responseType: 'blob',
        method: method,
    }).then(result => {
        if (result.status !== 200) {
            Message({
                message: '网络错误，请稍后重试',
                type: 'error',
            });
            cb && cb();
            return;
        }
        if (result.data.type === 'application/json' && needResultMsg) {
            const fileReader = new FileReader();
            fileReader.onload = function() {
                const { result, } = fileReader;
                const errorInfos = JSON.parse(result);
                const { msg, } = errorInfos;
                Message({
                    message: msg || '服务器异常，下载失败，请稍后重试~',
                    type: 'error',
                });
                cb && cb();
            };
            fileReader.readAsText(result.data);
            return;
        }
        if (result.data.type === 'application/json') {
            Message({
                message: '服务器异常，下载失败，请稍后重试~',
                type: 'error',
            });
            cb && cb();
            return;
        }

        try {
            let disposition = result.headers['content-disposition'] || result.headers['Content-Disposition'] || result.headers['Content-disposition']
            let fileName = downFileName ? downFileName : disposition.split('=')[1];
            let a = document.createElement('a');
            let blob = new Blob([result.data], { type: 'application/vnd.ms-excel', });
            a.download = decodeURI(fileName);
            a.href = window.URL.createObjectURL(blob);
            a.click();
            a.remove();
            Message({
                message: `${decodeURI(fileName)}${msg ? msg : '下载成功!'}`,
                type: 'success',
            });
            outputFileName = decodeURI(fileName);
        } catch (error) {
            Message({
                message: '服务器异常，下载失败，请稍后重试！',
                type: 'error',
            });
        }
        
        cb && cb(outputFileName);
    }).catch((e) => {
        Message({
            message: '网络错误，请稍后重试',
            type: 'error',
        });
        cb && cb();
    });
}
