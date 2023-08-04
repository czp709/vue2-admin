/* eslint-disable no-empty-function */
import Vue from 'vue'
import VueRouter from 'vue-router'
import beforEach from '@/router/beforEach'
import Cookies from 'js-cookie'

// 保存原型对象的Push
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写push方法
VueRouter.prototype.push = function (location, res, rej) {
  if (res && rej) {
    originPush.call(this, location, res, rej)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
// 重写replace方法
VueRouter.prototype.replace = function (location, res, rej) {
  if (res && rej) {
    originReplace.call(this, location, res, rej)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
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
  {
    path: '/TestPage',
    name: 'TestPage',
    component: () => {
      return import('@/views/TestPage')
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
