import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import TextTooltip from '@/components/TextTooltip'
import components from './components/index'
import VueJsx from 'vue-jsx'

Vue.use(VueJsx)
Vue.component('TextTooltip', TextTooltip)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'
// 防止用户修改sessionStorage
window.addEventListener('storage', (e) => {
  sessionStorage.setItem(e.key, e.oldValue)
})
Vue.use(components)
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
