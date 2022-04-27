// import Vue from 'vue'
import Vuex from "vuex"
import createdRoutes from "@/utils/createdRoutes.js"
import router, { resetRouter } from "@/router/index.js"
import Cookies from "js-cookie"

Vue.use(Vuex)
const state = {
  clubInfo: {},
  level: 0
}
const mutations = {
  saveclubInfo(state, clubInfo) {
    state.clubInfo = clubInfo
  },
  savelevel(state, level) {
    state.level = level
  }
}
const actions = {
  saveUserInfo({ commit, getters }, res) {
    return new Promise(resolve => {
      Cookies.set("token", res.data.data.token, { expires: 1 })
      sessionStorage.setItem("userInfo", JSON.stringify(res))
      commit("saveclubInfo", res.data.data)
      commit("savelevel", res.data.data.level)
      // 生成用户可访问的路由表
      const route = getters.addRouters
      // 将生成的路由表逐个添加入路由
      for (const item of route) {
        router.addRoute(item)
      }
      resolve()
    })
  },
  logout(context, data) {
    return new Promise(resolve => {
      Cookies.remove("token")
      sessionStorage.removeItem("userInfo")
      resetRouter()
      resolve()
    })
  }
}

const getters = {
  addRouters(state) {
    const { levelRouters } = require("@/router/levelRouters/index")
    return createdRoutes(levelRouters, state.level)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
