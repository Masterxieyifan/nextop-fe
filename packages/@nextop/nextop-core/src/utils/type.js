/*
 * @Author: hongdong.liao
 * @Date: 2021-01-05 15:50:30
 * @LastEditors: hongdong.liao
 * @LastEditTime: 2021-01-12 19:01:37
 * @FilePath: /vantop/packages/@vantop/vantop-core/src/utils/type.js
 * @description 类型检查基础类
 */

export default class DataType {
    /**
     * @method 检测当前目标是否为对象
     * @param {*} item
     */
    static isObject(item) {
        return Object.prototype.toString.call(item) === "[object Object]";
    }

    /**
     * @method 检测当前目标是否为字符串
     * @param {*} item
     */
    static isString(item) {
        return Object.prototype.toString.call(item) === "[object String]";
    }

    /**
     * @method 检测当前目标是否为数字
     * @param {*} item
     */
    static isNumber(item) {
        return Object.prototype.toString.call(item) === "[object Number]";
    }

    /**
     * @method 检测当前目标是否为Boolean
     * @param {*} item
     */
    static isBoolean(item) {
        return Object.prototype.toString.call(item) === "[object Boolean]";
    }

    /**
     * @method 检测当前目标是否为Undefined
     * @param {*} item
     */
    static isUndefined(item) {
        return Object.prototype.toString.call(item) === "[object Undefined]";
    }

    /**
     * @method 检测当前目标是否为Null
     * @param {*} item
     */
    static isNull(item) {
        return Object.prototype.toString.call(item) === "[object Null]";
    }

    /**
     * @method 检测当前目标是否为方法、函数
     * @param {*} item
     */
    static isFunction(item) {
        return Object.prototype.toString.call(item) === "[object Function]";
    }

    /**
     * @method 检测当前目标是否为日期
     * @param {*} item
     */
    static isDate(item) {
        return Object.prototype.toString.call(item) === "[object Date]";
    }

    /**
     * @method 检测当前目标是否为日期
     * @param {*} item
     */
    static isRegExp(item) {
        return Object.prototype.toString.call(item) === "[object RegExp]";
    }

    /**
     * @method 检测当前目标是否为错误
     * @param {*} item
     */
    static isError(item) {
        return Object.prototype.toString.call(item) === "[object Error]";
    }

    /**
     * @method 检测当前目标是否为DOM
     * @param {*} item
     */
    static isHTMLDocument(item) {
        return Object.prototype.toString.call(item) === "[object HTMLDocument]";
    }

    /**
     * @method 检测当前目标是否为window
     * @param {*} item
     */
    static isWindow(item) {
        return Object.prototype.toString.call(item) === "[object Window]";
    }

    /**
     * @method 检测当前目标是否为数组
     * @param {*} item
     */
    static isArray(item) {
        return Array.isArray(item);
    }

    /**
     * @method 检测当前目标是否为空数组
     * @param {*} item
     */
    static isEmptyArray(item) {
        return this.isArray(item) && item.length === 0;
    }

    /**
     * @method 检测当前目标是否为空对象
     * @param {*} item
     */
    static isEmptyObject(item) {
        return this.isObject(item) && Object.keys(item).length === 0;
    }
}