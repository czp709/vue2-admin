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
        <router-view></router-view>
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
    }
  },
  computed: {
    ...mapState({
      isPC: (state) => {
        return state.controlLable.isPC
      },
    }),
  },
}
</script>
<style scoped>
.aside {
  width: auto !important;
  height: 100vh;
  overflow-x: hidden;
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.2);
}

.headerMenu {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  margin: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-main {
  padding: 0;
}
.el-header {
  padding: 0 !important;
  background-color: #fff;
}
</style>
