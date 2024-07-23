<template>
  <el-container style="height: 100vh">
    <el-aside v-if="isPC" class="aside">
      <MainAside></MainAside>
    </el-aside>
    <el-container>
      <el-header>
        <Topheader v-if="isPC"></Topheader>
      </el-header>
      <el-main class="main">
        <transition :name="switchTransition">
          <keep-alive>
            <router-view v-if="$route.meta.caches"></router-view>
          </keep-alive>
        </transition>
        <transition :name="switchTransition">
          <router-view v-if="!$route.meta.caches"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Setting from '../utils/setting'
import MainAside from './components/aside.vue'
import Topheader from './components/header.vue'
import { mapState } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    MainAside,
    Topheader,
  },
  data() {
    return {
      Setting,
      switchTransition: 'twofade',
    }
  },

  computed: {
    ...mapState({
      isPC: (state) => {
        return state.controlLable.isPC
      },
    }),
  },
  mounted() {
    if (localStorage.getItem('githubStar')) {
      return
    }
    const github = require('../assets/github.png')
    this.$alert(
      `<a target="blank" class="github" href="https://github.com/czp709/vue2-admin"><img src="${github}" style="width:30px;height:30px" />如果感觉不错就去给个Star吧，万分感谢！</a>`,
      '给个Star吧',
      {
        dangerouslyUseHTMLString: true,
        showCancelButton: true,
        callback: (action) => {
          if (action === 'confirm') {
            window.open('https://github.com/czp709/vue2-admin')
            localStorage.setItem('githubStar', true)
          }
        },
      }
    )
  },
}
</script>
<style lang="less">
.twofade-enter-active,
.twofade-leave-active {
  transition: transform 0.5s, opacity 0.5s;
  position: absolute;
}

.twofade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.twofade-enter {
  opacity: 0;
  transform: translateX(100%);
}
.github {
  color: #1e1e1e;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
}
</style>
<style scoped>
.aside {
  width: auto !important;
  height: 100vh;
  overflow-x: hidden;
  background-color: #fff;
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.main {
  margin: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}
.el-main {
  padding: 0;
}
.el-header {
  padding: 0 !important;
  background-color: #fff;
  z-index: 1001;
}
</style>
