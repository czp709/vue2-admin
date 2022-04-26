// import Vue from 'vue'
import Vuex from 'vuex'
import createdRoutes from '@/utils/createdRoutes.js'
import { asyncRoutes, resetRouter } from '@/router/index.js'
import Cookies from "js-cookie"
import router from '../../router'
Vue.use(Vuex)
const state = {
    clubInfo: {},
    level: 0
};
const mutations = {
    saveclubInfo(state, clubInfo) {
        state.clubInfo = clubInfo
    },
    savelevel(state, level) {
        state.level = level
    },
};
const actions = {
    saveUserInfo({ commit }, res) {
        return new Promise(resolve => {
            Cookies.set('token', res.data.data.token, { expires: 1 })
            sessionStorage.setItem('userInfo', JSON.stringify(res))
            commit('saveclubInfo', res.data.data)
            commit('savelevel', res.data.data.level)
            resolve()
        })
    },
    addRoutes(context) {
        let route = context.getters.addRouters
        for (let item of route) {
            router.addRoute(item)
        }
    },
    logout(context, data) {
        return new Promise(resolve => {
            Cookies.remove("token")
            sessionStorage.removeItem("userInfo")
            resetRouter()
            resolve()
        })
    }
};
const getters = {
    addRouters(state) {
        return createdRoutes(asyncRoutes, state.level)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

