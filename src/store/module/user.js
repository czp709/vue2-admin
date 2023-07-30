import Vue from 'vue'
import Vuex from 'vuex'
import createdRoutes from '@/utils/createdRoutes.js'
import router, { resetRouter } from '@/router/index.js'
import Cookies from 'js-cookie'
import { getMenu } from '@/api/user'
// eslint-disable-next-line no-undef
Vue.use(Vuex)
const state = {
  userInfo: {},
  level: '0',
}
const mutations = {
  saveuserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  saveUserMenu(state, level) {
    state.level = level
  },
}
const actions = {
  saveUserInfo({ commit }, res) {
    return new Promise((resolve) => {
      localStorage.setItem('userInfo', JSON.stringify(res))
      commit('saveuserInfo', res)
      resolve()
    })
  },
  async saveUserMenu({ commit, getters }) {
    const { data: menuData } = await getMenu()
    commit('saveUserMenu', menuData)
    // 生成用户可访问的路由表
    const route = getters.addRouters
    // 将生成的路由表逐个添加入路由
    for (const item of route) {
      router.addRoute(item)
    }
  },
  logout() {
    Cookies.remove('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('refreshToken')
    resetRouter()
  },
}

const getters = {
  addRouters(state) {
    const { levelRouters } = require('@/router/index')
    const menu = createdRoutes(state.level)
    levelRouters[0].children = menu
    return levelRouters
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
