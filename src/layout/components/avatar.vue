<template>
  <div class="demo-basic--circle">
    <div class="block">
      <el-avatar
        slot="reference"
        :src="userInfo.avatar || avatar"
        :size="35"
        :title="userInfo.nickname"></el-avatar>
      <el-dropdown placement="bottom">
        <span id="large" class="el-dropdown-link">
          {{ userInfo.nickname || nickname
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-link style="width: 100%" href="#/page1" :underline="false">
              进入示例页面1
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-button
              type="text"
              style="width: 100%; color: red"
              @click="logout">
              退出
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'HomeAvater',
  data() {
    return {
      avatar:
        'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      nickname: 'admin',
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => {
        return state.user.userInfo
      },
      level: (state) => {
        return state.user.level
      },
    }),
  },
  methods: {
    logout() {
      const that = this
      that.$confirm('确认退出吗?', '提示', {}).then(() => {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.replace('/')
        })
      })
    },
  },
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
