/*
 * @Author: lingyong.zeng
 * @Date: 2021-04-27 16:53:51
 * @LastEditors: lingyong.zeng
 * @LastEditTime: 2022-04-19 13:55:36
 * @Description: 
 * @FilePath: /nextop-http/src/core/storageService/api.js
 */

import http from "../../core/service";

export const STORAGE = {
    PERSON_CONFIG: '/system/personConfig',
};

/**
*
* @description get person config by key
* @param id primary key
* @param path path of location
* @param userId id of user
*/
export const getPersonalConfig = (params) =>
    http.post(`${STORAGE.PERSON_CONFIG}/getConfig`, params, {
        cancelToken: false
    });

/**
*
* @description set person config
* @param id primary key
* @param path path of location
* @param userId id of user
* @param content the content of config
*/
export const setPersonalConfig = (params) =>
    http.post(`${STORAGE.PERSON_CONFIG}/addConfig`, params, {
        cancelToken: false
    });

/**
*
* @description delete person config
* @param id primary key
* @param path path of location
* @param userId id of user
*/
export const deletePersonalConfig = (params) =>
    http.delete(`${STORAGE.PERSON_CONFIG}/deleteConfig`, params, {
        cancelToken: false
    });

/**
*
* @description delete person config
* @param id primary key
* @param path path of location
* @param userId id of user
*/
export const updatePersonalConfig = (params) =>
    http.put(`${STORAGE.PERSON_CONFIG}/updateConfig`, params, {
        cancelToken: false
    });

