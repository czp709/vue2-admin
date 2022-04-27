<template>
  <el-menu class="el-menu-demo" mode="horizontal" unique-opened router>
    <template v-for="item in List">
      <el-submenu :index="item.path" :key="item.index" v-if="item.children && !item.meta.hidden">
        <template slot="title">
          <i :class="item.meta.icon"></i>
        </template>
        <el-menu-item class="subs" :index="child.path" v-for="child in item.children" :key="child.index">
          <i :class="child.meta.icon"></i>
          {{ child.meta.title }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.path" :key="item.index">
        <i :class="item.meta.icon"></i>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "TopHeader",
  data () {
    return {
      screenWidth: document.documentElement.clientWidth || document.documentElement.offsetWidth || document.body.offsetWidth || window.innerWidth,
      name: "admin",
      circleUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      addRouters: "user/addRouters"
    }),
    List () {
      return this.addRouters[0].children.filter((item) => {
        if (!item.meta.hidden) {
          return true
        } else {
          return false
        }
      })
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
.header {
  justify-content: space-between !important;
}
</style>
