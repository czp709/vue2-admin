/*
 * @Descripttion:axios封装
 * @version:
 * @Author: 陈志鹏
 * @Date: 2021-08-11 19:03:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-25 15:18:56
 */
// 导入axios
import axios from 'axios'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
import { refreshTokenApi } from '../api/user'

// 1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: process.env.VUE_APP_BASE_URL,
  // 超时时间 单位是ms，这里设置了10s的超时时间
  timeout: 10 * 1000,
})
// 2.请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 如果我们的使用的接口需要配置headers请求头或者body请求，可以再改部分添加
    // headers请求头:config.headers["字段名"]="字段值" + token值
    config.headers = {
      // 'Content-Type': 'application/json;charset=UTF-8',
      Authorization: Cookies.get('token'),
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

let isRefreshing = false // 标志是否正在刷新,防止多个请求同时进入时多次调用刷新token
let requests = [] // 存储待重新发送请求的数组
// 3.响应拦截器
service.interceptors.response.use(
  (response) => {
    if (
      (!response.config.self || !response.config.self.hiddenMsg) &&
      response.config.method.toLocaleLowerCase() != 'get'
    ) {
      Message.success(response.data.msg)
    }
    return Promise.resolve(response.data)
  },
  (err) => {
    if (err.response.status == 405) {
      const refreshToken = localStorage.getItem('refreshToken')
      const { config } = err
      if (!isRefreshing) {
        isRefreshing = true
        // 用刷新refreshToken去刷新accessToken
        return refreshTokenApi({ refreshToken })
          .then((res) => {
            if (res.code == 200) {
              const accessToken = res.data.token
              config.headers.Authorization = accessToken
              Cookies.set('token', accessToken)
              localStorage.setItem('refreshToken', res.data.refresh_token)
              // 重新执行等待队列里的函数，数组里存的是函数
              requests.forEach((cb) => {
                return cb(accessToken)
              })
              // 队列执行完后清空数组
              requests = []
              return service(config)
            }
            location.href = '/'
            Message.error('登录超时，请重新登录！')
          })
          .catch(() => {
            location.href = '/'
            Message.error('登录超时，请重新登录！')
          })
          .finally(() => {
            isRefreshing = false
          })
      }
      return new Promise((resolve) => {
        // 数组里是函数
        requests.push((token) => {
          config.headers.Authorization = token
          resolve(service(config))
        })
      })
    }
    Message.error(err.response.data.msg)
    /** *** 处理结束 *****/
    // 如果不需要错误处理，以上的处理过程都可省略
    return Promise.resolve(err.response)
  }
)
// 4.导入文件
export default service
