import store from '../store/index'
import Cookies from 'js-cookie'

const whiteList = ['/']
const beforeEach = async (to, from, next, router) => {
  if (Cookies.get('token') && localStorage.getItem('userInfo')) {
    // 判断是否已经登陆过
    // 如果登陆过但是路由还未生成就先生成路由
    if (whiteList.indexOf(to.path) === -1 && to.matched.length === 0) {
      await store.dispatch(
        'user/saveUserInfo',
        JSON.parse(localStorage.getItem('userInfo'))
      )
      await store.dispatch('user/saveUserMenu')
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    }
    selfExecution({ to, from, next, router })
    next()
  } else {
    // 如果没有登陆过就将除了白名单页面之外的页面访问都重定向到登陆页面
    whiteList.indexOf(to.path) !== -1 ? next() : next('/')
  }
}
// 接受参数{ to, from, next, router }
function selfExecution() {
  // 你可以在这个地方加入登陆后的其它的路由拦截，例如没有执行某个操作不能进入含有权限的某个页面等
}
export default beforeEach
