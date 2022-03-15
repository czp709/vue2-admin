<template>
  <div
    class="header"
    style="text-align: right; font-size: 12px;"
  >
    <el-tooltip
      class="item"
      effect="dark"
      content="点击展开/收起侧边导航栏"
      placement="bottom"
    >
      <span @click="$store.commit('user/changefold')">
        <i
          v-show="!$store.state.user.menufold"
          class="el-icon-s-fold"
        ></i>
        <i
          v-show="$store.state.user.menufold"
          class="el-icon-s-unfold"
        ></i>
      </span>
    </el-tooltip>
    <Avatar></Avatar>
  </div>
</template>
<script>
import Avatar from "./avatar.vue"
export default {
  components: {
    Avatar
  },
  name: "Aside",
  data () {
    return {
    }
  },
  methods: {
    // 修改密码点击确定执行的函数
    changepwd () {

    }
  }
}
</script>
<style scoped>
.header {
  height: auto !important;
  padding: 10px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
