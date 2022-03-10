<template>
  <div class="demo-basic--circle">
    <div class="block">
      <el-avatar
        :src="clubInfo.logo||logo"
        slot="reference"
        :size='60'
      ></el-avatar>
      <el-dropdown
        class="name"
        placement="bottom"
      >
        <span
          class="el-dropdown-link"
          id="large"
        >
          {{ clubInfo.name || name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="a"
            v-if="level === 1"
          >
            <el-link
              style="width: 100%"
              href="#/page1"
              :underline="false"
            >进入示例页面1</el-link>
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

  },
  computed: {
    ...mapState({
      clubInfo: state => { return state.user.clubInfo },
      level: state => { return state.user.level }
    })
  }
}
</script>
<style scoped>
.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10vh;
}

#large {
  font-size: 16px;
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.name {
  margin-top: 10px;
}
</style>
