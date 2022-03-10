/*
 * @Descripttion:
 * @version:
 * @Author: 陈志鹏
 * @Date: 2021-08-11 10:49:33
 * @LastEditors: 陈志鹏
 * @LastEditTime: 2021-10-13 14:38:39
 */
/** **   http.js   ****/
// 导入封装好的axios实例
import request from './request'
const http = {
    /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
   */
    get (url, params) {
        const config = {
            method: 'get',
            url: url
        }
        return request(config)
    },
    post (url, params) {
        const config = {
            method: 'post',
            url: url
        }
        if (params) config.data = params
        return request(config)
    },
    put (url, params) {
        const config = {
            method: 'put',
            url: url
        }
        if (params) config.data = params
        return request(config)
    },
    delete (url, params) {
        const config = {
            method: 'delete',
            url: url
        }
        if (params) config.data = params
        return request(config)
    }
}
// 导出
export default http
