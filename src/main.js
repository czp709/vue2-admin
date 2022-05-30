// import Vue from 'vue'
import App from "./App.vue";
import axios from "axios";
import Cookies from "js-cookie";
import router from "./router";
import store from "./store";
import "./mock/mock.js";
Vue.prototype.$Cookies = Cookies;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === "development";
let authorStyle = 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;';
let authorName = 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;';
console.log(`%c Author : %c zipen Chen `, authorStyle, authorName);
console.log(`%c If you find any problems or have any suggestions, please send me an email `, 'background: #1475B2; color: #fff; border-radius: 3px 3px 3px 3px;');
console.log(`%c email:chenzhipeng709@163.com `, 'background: #1475B2; color: #fff; border-radius: 3px 3px 3px 3px;');
// 防止用户修改sessionStorage
window.addEventListener("storage", function (e) {
  sessionStorage.setItem(e.key, e.oldValue);
});
// button节流，在button中添加v-preventReClick即可控制按钮，防止按钮连击，时间限制2s
Vue.directive("preventReClick", {
  inserted(el) {
    el.addEventListener("click", () => {
      if (el.style.pointerEvents !== "none") {
        el.style.pointerEvents = "none";
        setTimeout(() => {
          el.style.pointerEvents = "";
        }, 2000);
      }
    });
  }
});
new Vue({
  router,
  store,
  render: h => { return h(App); }
}).$mount("#app");
