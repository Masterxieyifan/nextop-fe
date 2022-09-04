/*
 * @Author: hongdong.liao
 * @Date: 2021-03-29 10:34:27
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-02-22 14:02:06
 * @FilePath: /nextop-core/src/directives/permission.js
 */
import { LocalStorage, } from '../storage/index';

export const permissionDirective = () => {
    Vue.directive('permission', {
        bind(el, binding) {
            const permission = hasPermission(binding.value);
            if (permission) {
                el.classList.add('permission-disabled');
                el.setAttribute('disabled', 'disabled');
                el.addEventListener('click', (event)=>{
                    event && event.stopImmediatePropagation();
                }, true);
            }
        },
    });
};

export function hasPermission(authName) {
    const authCodeList = LocalStorage.getAuthCodeList()|| [];
    return !(authCodeList.length > 0 && authCodeList.includes(authName));
}
