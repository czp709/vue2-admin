import request from '@/utils/request'

export function loginApi(data) {
  return request({
    url: 'login',
    method: 'POST',
    data,
  })
}

export function getCaptcha(params) {
  return request({
    url: 'captcha',
    method: 'get',
    params,
    self: {
      hiddenMsg: true,
    },
  })
}
export function queryUser(params) {
  return request({
    url: 'users/queryUser',
    method: 'get',
    params,
    self: {
      hiddenMsg: true,
    },
  })
}
export function refreshTokenApi(data) {
  return request({
    url: 'refreshToken',
    method: 'POST',
    data,
    self: {
      hiddenMsg: true,
    },
  })
}

export function getDeptTree() {
  return request({
    url: 'dept/tree',
    method: 'get',
  })
}

export function changeStatus(data) {
  return request({
    url: 'users/changeStatus',
    method: 'POST',
    data,
  })
}
