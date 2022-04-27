/**
 * 判单当前的路由对象是否在登录人的权限之内
 * @param {Array} roles 权限
 * @param {Object} route 路由
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.levelname) { // 路由需要权限就要在权限数组里面判断
    return roles.includes(route.meta.levelname)
  } else { // 不需要权限就直接通过
    return true
  }
}

/**
 * 根据接口获取的权限列表动态生成当前用户的侧边导航栏，返回通过权限验证的路由数组
 * @param {Array} asyncRoutes 需要过滤的路由
 * @param {Array} roles 权限
 */
function createdRoutes(asyncRoute, roles) {
  const res = []
  asyncRoute.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) { // 当前路由通过权限验证直接通过
      if (tmp.children && tmp.children.length) { // 当前路由有子路由，就递归验证
        tmp.children = createdRoutes(route.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
export default createdRoutes
