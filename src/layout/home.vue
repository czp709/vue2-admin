<template>
  <el-container>
    <el-aside
      v-if="$store.state.user.isPC"
      class="aside"
      style="overflow-x: hidden"
    >
      <Main-Aside></Main-Aside>
      <div class="logout">
        <el-button
          type="danger"
          icon="el-icon-switch-button"
          circle
          @click="logout"
        ></el-button>
      </div>
    </el-aside>
    <el-main class="main">
      <TopHeader
        class="header"
        v-if="!$store.state.user.isPC"
      ></TopHeader>
      <el-card
        class="box-card"
        id="box"
        shadow="hover"
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
import TopHeader from "./components/header.vue"

export default {
  name: "Home",
  components: {
    MainAside,
    TopHeader
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
    logout () {
      var that = this
      that.$confirm("确认退出吗?", "提示", {}).then(() => {
        this.$store.dispatch("user/logout").then(() => {
          this.$router.replace("/")
        })
      })
    }
  }
}
</script>
<style scoped>
.aside {
  width: 180px !important;
  height: 100vh;
  background-color: #3d4657;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  min-height: 100% !important;
  border: none !important;
}

.logout {
  display: flex;
  justify-content: center;
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
