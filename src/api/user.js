import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: 'login',
    method: 'POST',
    data,
  })
}
