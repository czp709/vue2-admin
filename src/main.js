// import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Cookies from "js-cookie"
import router from './router'
import store from './store'
import "./mock/mock.js";
import { getAPI, postAPI, putAPI, deleteAPI } from './api/api'
Vue.prototype.$Cookies = Cookies
Vue.prototype.axios = axios
Vue.prototype.$getAPI = getAPI
Vue.prototype.$postAPI = postAPI
Vue.prototype.$putAPI = putAPI
Vue.prototype.$deleteAPI = deleteAPI
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development' ? true : false
// 防止用户修改sessionStorage
window.addEventListener('storage', function (e) {
  sessionStorage.setItem(e.key, e.oldValue)
});
// button节流，在button中添加v-preventReClick即可控制按钮，防止按钮连击，时间限制2s
Vue.directive("preventReClick", {
  inserted(el, binding) {
    el.addEventListener("click", () => {
      if (el.style.pointerEvents !== "none") {
        el.style.pointerEvents = "none"
        setTimeout(() => {
          el.style.pointerEvents = ""
        }, 2000)
      }
    })
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')