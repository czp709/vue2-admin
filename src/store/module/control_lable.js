import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  isPC: (function () {
    const flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    return !flag
  })(),
  menufold: localStorage.getItem('menufold') != 'false'
}
const mutations = {
  changefold (state) {
    state.menufold = !state.menufold
    localStorage.setItem('menufold', Boolean(state.menufold))
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
