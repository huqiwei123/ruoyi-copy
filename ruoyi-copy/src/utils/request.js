/*
 * @Author: huqiwei123 463564148@qq.com
 * @Date: 2024-07-31 21:39:43
 * @LastEditors: huqiwei123 463564148@qq.com
 * @LastEditTime: 2024-07-31 23:10:57
 * @FilePath: /ruoyi-copy/ruoyi-copy/src/utils/request.js
 * @Description: 
 */

// npm install axios
import axios from 'axios'
import { Notification, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { get } from 'core-js/core/dict'

// 设置axios全局请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例，配置请求的基础URL，process.env.VUE_APP_BASE_API是从环境变量中获取的一个值，这个值通常在项目的.env文件中定义
// VUE_APP_BASE_API是基础API的URL，被用作axios请求的基础路径
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000
})

// 调用axios实例的interceptors.request.use方法，为请求添加一个请求拦截器，默认传入请求的配置对象config
// service.interceptors.request.use(config => {}, error => {})
service.interceptors.request.use(
    config => {
        // 通过js-cookie中的Cookies.get方法获得名为'Admin-Token'的token值（将获取'Admin-Token'的token值的过程封装成了getToken函数）
        // 检查浏览器中是否存在TokenKey为'Admin-Token'的token
        if (getToken()) {
            // 将 token 添加到请求的 Authorization 头部，前面加上 'Bearer '。这是一种常见的方式，用于将 token 发送到服务器以进行身份验证
            config.headers['Authorization'] = ' Bearer ' + getToken()
        }
        return config
    }
),
    error => {
        console.log(error)
        Promise.reject(error)
    }

// 调用axios示例的interceptors.response.use方法，添加响应拦截器
// service.interceptors.response.use(res => {}, error => {})
service.interceptors.response.use( res => {
    const code = res.data.code
    if (code == 401) {
        MessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
        ).then(() => {
            // 调用 Vuex store 中的 'LogOut' action。'LogOut' action 通常会清除用户的登录状态，例如清除存储在 Vuex store 中的用户信息和 token
            // TODO:store.dispatch('LogOut')和location.reload()的含义？
            store.dispatch('LogOut').then(() => {
                // 重新加载当前页面，应用使用了 vue-router，那么重新加载页面也会导致 vue-router 对象被重新实例化
                location.reload()
            })
        })
    } else if (code !== 200) {
        Notification.error({
            title: res.data.msg
        })
        return Promise.reject('error')
    } else {
        return res.data
    }
},
    error => {
        console.log('err' + error)
        MessageBox({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service