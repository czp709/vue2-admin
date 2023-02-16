/*
 * @Descripttion:axios封装
 * @version:
 * @Author: 陈志鹏
 * @Date: 2021-08-11 19:03:56
 * @LastEditors: 陈志鹏
 * @LastEditTime: 2021-10-13 14:44:00
 */
// 导入axios
import axios from 'axios'
import Cookies from 'js-cookie'
// 允许axios携带cookies
axios.defaults.withCredentials = true
// 1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: process.env.VUE_APP_BASE_URL,
  // 超时时间 单位是ms，这里设置了10s的超时时间
  timeout: 10 * 1000
})
// 2.请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 如果我们的使用的接口需要配置headers请求头或者body请求，可以再改部分添加
  // headers请求头:config.headers["字段名"]="字段值" + token值
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    token: Cookies.get('token')
  }
  return config
}, (error) => {
  Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use((response) => {
  // 接收到响应数据并成功后的一些共有的处理，关闭loading等
  if (!response.data || response.data.code !== 200) {
    return Promise.reject(response)
  }
  return Promise.resolve(response)
}, (error) => {
  this.$message.errorr(error.message)
  /** *** 处理结束 *****/
  // 如果不需要错误处理，以上的处理过程都可省略
  return Promise.resolve(error.response)
})
// 4.导入文件
export default service
