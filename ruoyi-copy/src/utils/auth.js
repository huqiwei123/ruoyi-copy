/*
 * @Author: huqiwei123 463564148@qq.com
 * @Date: 2024-07-31 21:58:45
 * @LastEditors: huqiwei123 463564148@qq.com
 * @LastEditTime: 2024-07-31 22:40:54
 * @FilePath: /ruoyi-copy/ruoyi-copy/src/utils/auth.js
 * @Description: 调用js-cookie库中的Cookies.get方法获取TokenKey为'Admin-Token'的token值，Cookies.set设置值，Cookies.remove方法移去token值
 */

// 导入js-cookie库来操作cookies
// js-cookie 是一个 JavaScript 库，它提供了一种简单、方便的方式来创建、读取和删除 cookies
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// 从Cookies中获取名为Admin-Token的cookie
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}