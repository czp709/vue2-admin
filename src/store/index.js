import { Store } from 'vuex'
import user from './module/user'
import controlLable from './module/control_lable'
import createPersistedState from 'vuex-persistedstate'

export default new Store({
  state: {
    // 侧边栏背景色
    aside_color: '#3d4657',
    // 侧边栏字体颜色
    aside_text_color: '#ffffff',
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    controlLable,
  },
  getters: {},
  // 为了防止刷新页面vuex中的数据丢失，可以选择性地将数据存入sessionstorage中，防止丢失
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      // reducer传递val
      reducer() {
        return {
          // 只储存state中的isPC
          // isPC: val.user.isPC
        }
      },
    }),
  ],
})
