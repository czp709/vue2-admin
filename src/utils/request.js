// 导入axios
import axios from 'axios'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
import { refreshTokenApi } from '../api/user'
import { cloneDeep } from 'lodash'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10 * 1000,
})

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
    if (err.response?.status == 405) {
      const refreshToken = localStorage.getItem('refreshToken')
      let { config } = err
      config = cloneDeep(config)
      if (config.data) {
        config.data = JSON.parse(config.data)
      }
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
    if (err.response?.status == 401) {
      location.href = '/'
      Message.error('登录超时，请重新登录！')
      return Promise.reject(err.response)
    }
    Message.error(err.response?.data?.msg)
    /** *** 处理结束 *****/
    return Promise.reject(err.response)
  }
)
// 4.导入文件
export default service
