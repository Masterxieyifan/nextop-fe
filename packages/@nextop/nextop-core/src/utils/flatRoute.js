/*
 * @Author: hongdong.liao
 * @Date: 2021-02-02 16:07:54
 * @LastEditors: hongdong.liao
 * @LastEditTime: 2021-02-02 18:46:43
 * @FilePath: /nextop/packages/@nextop/nextop-core/src/utils/flatRoute.js
 */
/**
 * @param {*} item 菜单数据
 */
import { isArray, cloneDeep } from "@master_vantop/vantop-util";

export const flatRoute = item => {
    if (!isArray(item)) {
        throw Error('item 必须是一个数组');
    }
    let flat = cloneDeep(item); // 循环的源数据
    let filterFlat = cloneDeep(item); // 要组装的数据
    filterFlat.forEach(item => {
        item.children = [];
    })

    const loop = (e, i) => { // 递归设置
        if (e?.length) {
            e.forEach(x => {
                if (x?.children?.length) {
                    loop(x.children, i);
                }
            });
        }
        filterFlat[i].children.push(...e);
    }

    flat.forEach((e, i) => {
        if (e?.children?.length) {
            loop(e.children, i)
        }
    });

    return filterFlat;
}
