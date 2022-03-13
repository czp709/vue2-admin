// import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('@/components/login')
const retrievePassword = () => import('@/components/retrievePassword')
import { levelRouters } from './levelRouters/index'
import beforEach from '@/router/beforEach'
Vue.use(VueRouter)

export const baseRouter = [
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/retrievePassword',
        name: 'retrievePassword',
        component: retrievePassword
    }]

// 需要根据权限筛选的路由
export const asyncRoutes = [
    ...levelRouters
]

const createRouter = () => new VueRouter({
    routes: baseRouter
})
// 创建路由信息
const router = createRouter()
// 重置路由（由于router2没有提供重置路由的方式，所以采用替换路由的方式）
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
// 路由守卫
router.beforeEach((to, from, next) => beforEach(to, from, next, router));

export default router
