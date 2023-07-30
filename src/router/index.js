import Vue from 'vue'
import VueRouter from 'vue-router'
import beforEach from '@/router/beforEach'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

export const baseRouter = [
  {
    path: '/',
    name: 'login',
    component: () => {
      return import('@/views/main/login/login')
    },
    beforeEnter(to, from, next) {
      if (localStorage.getItem('userInfo') && Cookies.get('token')) {
        next('/home')
      } else {
        next()
      }
    },
  },
]

export const levelRouters = [
  {
    path: '/home',
    component: () => {
      return import('@/layout/home')
    },
    meta: { hidden: false },
    children: [],
  },
]

const createRouter = () => {
  return new VueRouter({
    routes: baseRouter,
  })
}
// 创建路由信息
const router = createRouter()
// 重置路由（由于router2没有提供重置路由的方式，所以采用替换路由的方式）
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// 路由守卫
router.beforeEach((to, from, next) => {
  return beforEach(to, from, next, router)
})

export default router
