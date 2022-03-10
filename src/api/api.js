import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 */

// get请求
export function getAPI (params) {
    return http.get(params)
}
// post请求
export function postAPI (url, params) {
    return http.post(url, params)
}
// put 请求
export function putAPI (url, params) {
    return http.put(url, params)
}
// delete 请求
export function deleteAPI (url, params) {
    return http.delete(url, params)
}
