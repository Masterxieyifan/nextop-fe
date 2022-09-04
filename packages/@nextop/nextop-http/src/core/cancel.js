/*
 * @Author: lingyong.zeng
 * @Date: 2022-06-10 14:01:03
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-06-20 13:33:53
 * @Description: 
 * @FilePath: /nextop/packages/@nextop/nextop-http/src/core/cancel.js
 */
// 用于存储接口请求的队列
let axiosCancelList = []

// 向队列中添加（用于接口发起请求时使用）
export const addAxiosCancel = (item) => {
    const { key, cancel } = item || {};
    key && cancel && axiosCancelList.push(item);
}

// 从取消队列中移除（用于接口完成时使用)
export const removeAxiosCancel = key => {
    const idx = axiosCancelList.findIndex(item => item.key === key );
    if (idx > -1) {
        axiosCancelList.splice(idx, 1);
    }
}

// 取消队列中所有未完成的接口
export const clearAxiosCancel = (isLogout = false) => {
    if (isLogout) {
        axiosCancelList.forEach(item => {
            item.cancel && item.cancel();
        });
    }
    axiosCancelList = [];
}