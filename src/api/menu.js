import request from '@/utils/request'
import Setting from '@/utils/setting'

export function addMenu(data) {
  return request({
    url: Setting.api + '/menus/addMenu',
    method: 'POST',
    data,
  })
}
export function deleteMenu(params) {
  return request({
    url: Setting.api + '/menus/deleteMenu',
    method: 'delete',
    params,
  })
}
export function getMenuTree() {
  return request({
    url: Setting.api + '/menus/getMenuTree',
    method: 'get',
  })
}
export function getMenuInfo(id) {
  return request({
    url: Setting.api + '/menus/getMenuInfo/' + id,
    method: 'get',
  })
}
export function sortMenu(parentId, data) {
  return request({
    url: Setting.api + '/menus/sortMenu?parentId=' + parentId,
    method: 'POST',
    data,
  })
}
