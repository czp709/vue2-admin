import request from '@/utils/request'
import Setting from '@/utils/setting'
export function loginLog(params) {
  return request({
    url: Setting.api + '/loginfo/loginLog',
    method: 'get',
    params,
  })
}
export function allLog(params) {
  return request({
    url: Setting.api + '/loginfo/allLog',
    method: 'get',
    params,
  })
}
