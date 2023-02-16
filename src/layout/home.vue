<template>
  <el-container style="height: 100vh">
    <el-aside
      v-if="$store.state.controlLable.isPC"
      class="aside"
      :style="`background-color: ${$store.state.aside_color}`">
      <MainAside></MainAside>
    </el-aside>
    <el-container>
      <el-header>
        <Topheader v-if="$store.state.controlLable.isPC"></Topheader>
        <HeaderMenu
          v-if="!$store.state.controlLable.isPC"
          class="headerMenu"></HeaderMenu>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import MainAside from './components/aside.vue'
import headerMenu from './components/headerMenu.vue'
import Topheader from './components/header.vue'

export default {
  name: 'HomePage',
  components: {
    MainAside,
    HeaderMenu: headerMenu,
    Topheader,
  },
  data() {
    return {
      timer: true,
      device: true,
      header: false,
    }
  },
}
</script>
<style scoped>
.aside {
  width: auto !important;
  height: 100vh;
  overflow-x: hidden;
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
</style>
