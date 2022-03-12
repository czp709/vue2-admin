// import Vue from 'vue'
import Vuex from 'vuex'
import createdRoutes from '@/utils/createdRoutes.js'
import { asyncRoutes, resetRouter } from '@/router/index.js'
import Cookies from "js-cookie"
import router from '../../router'

Vue.use(Vuex)
const state = {
    isPC: (function () {
        let flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
        return !flag
    })(),
    clubInfo: {},
    level: 0,
    menufold:true
};
const mutations = {
    saveclubInfo(state, clubInfo) {
        state.clubInfo = clubInfo
    },
    savelevel(state, level) {
        state.level = level
    },
    changefold(state){
        state.menufold=!state.menufold
    }
};
const actions = {
    saveUserInfo({ commit }, data) {
        return new Promise(resolve => {
            Cookies.set('token', data.data.data.token, { expires: 1 })
            sessionStorage.setItem('userInfo', JSON.stringify(data))
            commit('saveclubInfo', data.data.data)
            commit('savelevel', data.data.data.level)
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

