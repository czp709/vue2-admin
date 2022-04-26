<template>
  <el-container style="height: 100vh;">
    <el-aside
      v-if="$store.state.control_lable.isPC"
      class="aside"
      style="overflow-x: hidden"
    >
      <Main-Aside></Main-Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Topheader v-if="$store.state.control_lable.isPC"></Topheader>
        <headerMenu
          class="headerMenu"
          v-if="!$store.state.control_lable.isPC"
        ></headerMenu>
      </el-header>
      <el-main class="main">
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
        <div style="width:100%;text-align: center;padding:5px 0">
          <a
            style="color:#666;font-size:5px"
            href="https://beian.miit.gov.cn/"
            target="_blank"
          >
            豫ICP备2021008006号-2</a>
        </div>
      </el-main>
    </el-container>
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
.headerMenu {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main {
  padding-right: 6px !important;
}

.el-header {
  padding: 0 !important;
  background-color: #fff;
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
