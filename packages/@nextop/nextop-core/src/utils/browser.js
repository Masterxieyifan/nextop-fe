/*
 * @Author: hongdong.liao
 * @Date: 2021-12-14 12:10:06
 * @LastEditors: hongdong.liao
 * @LastEditTime: 2021-12-14 12:10:06
 * @FilePath: /nextop/packages/@nextop/nextop-core/src/utils/browser.js
 */
export const browserKernel = () => {
    let u = navigator.userAgent;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) === ' qq' //是否QQ
    };

};

export const browser = () => {
    if (window.ActiveXObject)
        return 'IE';
    else if (document.getBoxObjectFor)
        return 'Firefox';
    else if (window.MessageEvent && !document.getBoxObjectFor)
        return 'Chrome';
    else if (window.opera)
        return 'Opera';
    else if (window.openDatabase)
        return 'Safari';
};

export const device = () => {
    let userAgentInfo = navigator.userAgent;
    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
    let flag = 'desktop';
    for (let i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
            flag = 'mobile';
            break;
        }
    }
    return flag;
};
