/*
 * @Author: hongdong.liao
 * @Date: 2021-01-05 15:49:12
 * @LastEditors: hongdong.liao
 * @LastEditTime: 2021-01-05 19:31:10
 * @FilePath: /vantop/packages/@vantop/vantop-core/src/config/settings.js
 */
// 基础配置项

// 存储类型
export const _storageType = {
    Local: 'local',
    Session: 'session'
}

// 时间单位 大小写不敏感 支持负数和缩写
export const _timeUnit = {
    Year: 'year', // Y 年
    Quarter: 'quarter', // Q 季度
    Month: 'month', // M 月
    Week: 'week', // W 周
    Day: 'day', // d 天
    Hour: 'hour', // h 时
    Minute: 'minute', // m 分
    Second: 'second', // s 秒
    MilliSecond: 'millisecond', // ms 毫秒
}