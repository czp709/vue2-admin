<template>
  <el-container>
    <el-aside
      v-if="$store.state.user.isPC"
      class="aside"
      style="overflow-x: hidden"
    >
      <Main-Aside></Main-Aside>
    </el-aside>
    <el-main class="main">
      <headerMenu
        class="header"
        v-if="!$store.state.user.isPC"
      ></headerMenu>
      <Topheader v-if="$store.state.user.isPC"></Topheader>
      <el-card
        class="box-card"
        id="box"
        shadow="hover"
        :body-style="{padding:'12px'}"
      >
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
      </el-card>
      <div style="width:100%;background: rgba(250, 250, 250, .8);text-align: center;padding:5px 0">
        <a
          style="color:#666;font-size:5px"
          href="https://beian.miit.gov.cn/"
          target="_blank"
        >
          豫ICP备2021008006号-1</a>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import MainAside from "./components/aside.vue"
import headerMenu from "./components/headerMenu.vue"
import Topheader from "./components/header.vue"
export default {
  name: "Home",
  components: {
    MainAside,
    headerMenu,
    Topheader
  },
  data () {
    return {
      timer: true,
      device: true,
      header: false
    }
  },
  // 用来判断设备是否为手机
  mounted () {

  },
  methods: {

  }
}
</script>
<style scoped>
.aside {
  width: auto !important;
  height: 100vh;
  background-color: #3d4657;
}

.header {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
}

.home {
  height: 100vh;
}

.main {
  height: calc(100vh - 10px) !important;
  overflow-y: scroll;
  padding: 5px !important;
}

.el-card {
  min-height: 80% !important;
  border: none !important;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
