import page404 from '@/views/main/error/404'
import array2Tree from '@/utils/index'
import { cloneDeep } from 'lodash'

function createdRoutes(json) {
  const sort = array2Tree(cloneDeep(json), { id: 'menuId' })
  const router = []
  const json2Route = (arr) => {
    arr.forEach((item) => {
      if (item.menuType == 'C') {
        router.push({
          path: '/' + item.path,
          name: item.path,
          component: (resolve) => {
            let component
            component = import(`@/views/${item.component}`).catch(() => {
              component = require([`@/views/main/error/404`], resolve)
            })
            return component
          },
          meta: {
            hidden: false, // hidden为false，在侧边导航栏显示
            title: item.menuName, // 侧边导航栏显示的名称
            icon: item.icon,
            caches: item.isCache == 0,
          },
        })
      } else if (item.menuType == 'M' && item.children) {
        json2Route(item.children)
      }
    })
  }

  json2Route(sort)
  router.unshift({
    path: '',
    name: '',
    component: router[0].component,
    meta: {
      hidden: true, // hidden为true时不在侧边导航栏显示
    },
  })
  router.push({
    path: '/*',
    meta: {
      hidden: true,
    },
    component: page404,
  })
  return router
}
export default createdRoutes
