<template>
  <div class="demo-basic--circle">
    <div class="block">
      <el-avatar :src="userInfo.logo||logo" slot="reference" :size='35' :title="userInfo.name"></el-avatar>
      <el-dropdown placement="bottom">
        <span class="el-dropdown-link" id="large">
          {{ userInfo.name || name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-link style="width: 100%" href="#/page1" :underline="false">进入示例页面1</el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button @click="logout" type="text" style="width:100%;color:red">退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import {
  mapState
} from "vuex"
export default {
  data () {
    return {
      logo: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      name: "admin"
    }
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
  },
  computed: {
    ...mapState({
      userInfo: state => { return state.user.userInfo },
      level: state => { return state.user.level }
    })
  }
}
</script>
<style scoped>
.demo-basic--circle {
  display: inline-block;
}
.block {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

#large {
  font-size: 16px;
}

.el-dropdown {
  margin-right: 10px;
}
</style>
