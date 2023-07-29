import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import components from './components/index'
import './plugins/element.js'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.use(components)
// 防止用户修改localStorage
window.addEventListener('storage', (e) => {
  localStorage.setItem(e.key, e.oldValue)
})
// button节流，在button中添加v-preventReClick即可控制按钮，防止按钮连击，时间限制2s
Vue.directive('preventReClick', {
  inserted(el) {
    el.addEventListener('click', () => {
      if (el.style.pointerEvents !== 'none') {
        el.style.pointerEvents = 'none'
        setTimeout(() => {
          el.style.pointerEvents = ''
        }, 2000)
      }
    })
  },
})
new Vue({
  router,
  store,
  render: (h) => {
    return h(App)
  },
}).$mount('#app')
