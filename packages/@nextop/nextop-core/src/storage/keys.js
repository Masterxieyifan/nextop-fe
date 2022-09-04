/*
 * @Author: lingyong.zeng
 * @Date: 2022-05-11 15:36:08
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-05-31 19:37:25
 * @Description: 
 * @FilePath: /@nextop/nextop-core/src/storage/keys.js
 */

const LOCAL_STORAGE_KEYS = {
    AUTH_CODE_LIST: 'AUTH_CODE_LIST',                       // 权限
    TOKEN: 'TOKEN',                                         // token
    USER_INFO: 'USER_INFO',                                 // 用户信息
    ORIGINAL_MENU: 'ORIGINAL_MENU',                         // 原始菜单列表
    SIDEBAR_STATUS: 'SIDEBAR_STATUS',                       // 侧边栏状态
    WITHOUT_ANIMATION: 'WITHOUT_ANIMATION',                 // 侧边栏动画
    ACTIVE_SUB_PANEL: 'ACTIVE_SUB_PANEL',                   // 激活面板状态 跟侧边栏相关，后续可能不需要这个侧边栏激活面板了
    FLAT_MENU: 'FLAT_MENU',                                 // 原始菜单扁平化
    ACTIVE_MENU: 'ACTIVE_MENU',                             // 当前激活菜单
    ACTIVED_MENU_CHILD_CACHE: 'ACTIVED_MENU_CHILD',         // 当前激活的子菜单 存储激活菜单下面的children
    LANGUAGE: 'LANGUAGE',                                   // 当前语言
    TENANT_INFO: 'TENANT_INFO',                             // 租户信息
    SUBAPPLICATION_ROUTES: 'SUBAPPLICATION_ROUTES',         // 子应用路由
    ALL_APPLICATION_ROUTES: 'ALL_APPLICATION_ROUTES',       // 全部的子应用路由
    EXTRACT_ROUTER_VIEW: 'EXTRACT_ROUTER_VIEW',             // 非子应用（main应用内部的要当做菜单显示出来的）router-view 状态
    REDIRECT: 'REDIRECT',                                   // 异常登出后待登入成功后重定向
    INIT_404_LIST: 'INIT_404_LIST',                         // 初始化应用404记录列表
    ROLEID: 'ROLEID',                                       // 角色ID
    CLASSIFY_CODE: 'CLASSIFY_CODE',                         // 项目code
    DEFAULTOPENEDMENU: 'DEFAULTOPENEDMENU',                 // 默认打开菜单
    SESSION_ID: 'SESSION_ID',                               // cookie sessionid
    USER_GUIDE_ROUTES: 'USER_GUIDE_ROUTES',                 // 用户指引路由数据
    FLAT_LAST_MENU_URL: 'FLAT_LAST_MENU_URL',               // 后台返回的末级菜单
    ADMIN_INFO: 'ADMIN_INFO',                               // 菜单接口返回的管理员信息
    HISTORY: 'HISTORY'                                      // 记录浏览器历史记录
}

const SESSION_STORAGE_KEYS = {
    TAG: 'TAG',                                             // 顶部tag
    ROUTES: 'ROUTES',                                       // 路由
    TAG_LIST: 'TAG_LIST',                                   // 顶部 tag 集合
    EXIT_STATUS: 'EXIT_STATUS',                             // 退出状态
    HISTORY: 'HISTORY'                                      // 记录浏览器历史记录
}

export {
    LOCAL_STORAGE_KEYS,         
    SESSION_STORAGE_KEYS
}
