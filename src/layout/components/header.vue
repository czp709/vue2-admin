<template>
  <div class="header" style="text-align: right; font-size: 12px">
    <el-tooltip
      class="item"
      effect="dark"
      content="点击展开/收起侧边导航栏"
      placement="bottom">
      <span @click="$store.commit('controlLable/changefold')">
        <i
          v-show="!$store.state.controlLable.menufold"
          class="el-icon-s-fold"></i>
        <i
          v-show="$store.state.controlLable.menufold"
          class="el-icon-s-unfold"></i>
      </span>
    </el-tooltip>
    <div class="header_right">
      <a
        target="blank"
        class="github"
        href="https://github.com/czp709/vue2-admin">
        <img
          src="../../assets/github.png"
          style="width: 25px; height: 25px; margin-right: 16px" />
      </a>
      <Fullscreen class="fullscreen"></Fullscreen>
      <Avatar></Avatar>
    </div>
  </div>
</template>
<script>
import Avatar from './avatar.vue'
import fullscreen from './fullScreen.vue'

export default {
  name: 'HomeHeader',
  components: {
    Avatar,
    Fullscreen: fullscreen,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped>
.header {
  height: 60px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.header_right {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.fullscreen {
  margin-right: 10px;
}
.logout {
  display: inline-block;
}
.header i {
  font-size: 22px;
  float: left;
  color: #606266;
}
</style>
