import request from '@/utils/request'
import Setting from '@/utils/setting'

export function loginApi(data) {
  return request({
    url: Setting.api + '/login',
    method: 'POST',
    data,
  })
}

export function getCaptcha(params) {
  return request({
    url: Setting.api + '/captcha',
    method: 'get',
    params,
    self: {
      hiddenMsg: true,
    },
  })
}
export function queryUser(params) {
  return request({
    url: Setting.api + '/users/queryUser',
    method: 'get',
    params,
    self: {
      hiddenMsg: true,
    },
  })
}
export function refreshTokenApi(data) {
  return request({
    url: Setting.api + '/refreshToken',
    method: 'POST',
    data,
    self: {
      hiddenMsg: true,
    },
  })
}

export function getDeptTree() {
  return request({
    url: Setting.api + '/dept/tree',
    method: 'get',
  })
}

export function changeStatus(data) {
  return request({
    url: Setting.api + '/users/changeStatus',
    method: 'POST',
    data,
  })
}

export function getMenu() {
  return request({
    url: Setting.api + '/menus/getMenu',
    method: 'get',
  })
}

export function addUser(data) {
  return request({
    url: Setting.api + '/users/register',
    method: 'POST',
    data,
  })
}
