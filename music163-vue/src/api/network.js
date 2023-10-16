import axios from 'axios'
import Vue from 'vue'

// 全局配置
axios.defaults.baseURL = 'https://netease-cloud-music-livid.vercel.app'
axios.defaults.timeout = 5000
let count = 0
// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    count++
    Vue.showLoading()
    return config
}, error => {
    // 对请求错误做些什么
    Vue.hiddenLoading()
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
    // 对响应数据做点什么
    count--
    if (count === 0) {
        Vue.hiddenLoading()
    }
    return response
}, error => {
    // 对响应错误做点什么
    Vue.hiddenLoading()
    return Promise.reject(error)
})
// 封装get和post
export default {
    get: function (path = '', data = {}) {
        data.realIP = '116.25.146.177'
        return new Promise((resolve, reject) => {
            axios.get(path, {
                params: data
            }).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error)
            })
        })
    },
    post: function (path = '', data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(path, data)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    all: function (list) {
        return new Promise((resolve, reject) => {
            axios.all(list).then(axios.spread((...result) => {
                // 两个请求现在都执行完成
                resolve(result)
            })).catch(function (err) {
                reject(err)
            })
        })
    }
}
