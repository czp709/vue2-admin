import Vue from 'vue'
import Vuex from 'vuex'
import createdRoutes from '@/utils/createdRoutes.js'
import router, { resetRouter } from '@/router/index.js'
import Cookies from 'js-cookie'
import { getMenu } from '@/api/user'
import { debounce } from 'lodash'
// eslint-disable-next-line no-undef
Vue.use(Vuex)
const state = {
  userInfo: {},
  route: {},
}

const mutations = {
  saveuserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  saveUserMenu(state, route) {
    state.route = route
    localStorage.setItem('menuData', JSON.stringify(route))
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
  async saveUserMenu({ commit, getters, dispatch }, to) {
    const addRoute = (menuData) => {
      commit('saveUserMenu', menuData)
      // 生成用户可访问的路由表
      const route = getters.addRouters
      // 将生成的路由表逐个添加入路由
      for (const item of route) {
        router.addRoute(item)
      }
    }
    const localMenu = localStorage.getItem('menuData')
      ? JSON.parse(localStorage.getItem('menuData'))
      : []
    const haveRoute = localMenu.some((item) => {
      return '/' + item.path == to?.path || to?.path == '/home'
    })
    // 判断当前路由是否在用户可访问路由表中
    if (haveRoute) {
      addRoute(localMenu)
    }
    dispatch('getMenuData')
  },
  getMenuData: debounce(async ({ commit, getters }) => {
    const { data: menuData } = await getMenu()
    commit('saveUserMenu', menuData)
    // 生成用户可访问的路由表
    const route = getters.addRouters
    resetRouter()
    // 将生成的路由表逐个添加入路由
    for (const item of route) {
      router.addRoute(item)
    }
  }, 1000),
  logout() {
    Cookies.remove('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('menuData')
    resetRouter()
  },
}

const getters = {
  addRouters(state) {
    const { levelRouters } = require('@/router/index')
    const menu = createdRoutes(state.route)
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
