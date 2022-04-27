import store from "../store/index"
import Cookies from "js-cookie"
const whiteList = ["/retrievePassword", "/"]
const beforeEach = (to, from, next, router) => {
  if (Cookies.get("token") && sessionStorage.getItem("userInfo")) { // 判断是否已经登陆过
    // 如果登陆过但是路由还未生成就先生成路由
    if (whiteList.indexOf(to.path) === -1 && to.matched.length === 0) {
      const data = JSON.parse(sessionStorage.getItem("userInfo"))
      store.dispatch("user/saveUserInfo", data).then(() => {
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 
      })
    }
    // 如果已经登陆过，但是要前往白名单页面就清除掉登录信息
    if (whiteList.indexOf(to.path) !== -1 && whiteList.indexOf(from.path) === -1) {
      store.dispatch("user/logout")
    }
    Selfexecution(to, from, next, router)
    next()
  } else {
    // 如果没有登陆过就将除了白名单页面之外的页面访问都重定向到登陆页面
    whiteList.indexOf(to.path) !== -1 ? next() : next("/")
  }
}

function Selfexecution (to, from, next, router) {
  // 你可以在这个地方加入登陆后的其它的路由拦截，例如没有执行某个操作不能进入含有权限的某个页面等

}
export default beforeEach
