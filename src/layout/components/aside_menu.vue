<template>
  <el-menu class="el-menu-vertical-demo" :default-active="menuDefaultActive" background-color="#3d4657" active-text-color="#33a2ef" text-color="#fff" unique-opened router ref="asidemenu" :collapse="$store.state.control_lable.menufold">
    <template v-for="item in addRouters[0].children">
      <el-submenu :index="item.path" :key="item.path" v-if="item.children && !item.meta.hidden">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <el-menu-item :index="child.path" v-for="child in item.children" :key="child.index">
          <i :class="child.meta.icon"></i>
          <span slot="title">{{ child.meta.title }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item :index="item.path" :key="item.index" v-else-if="!item.meta.hidden">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      addRouters: "user/addRouters"
    }),
    menuDefaultActive () {
      const path = this.$route.path === "/home" ? this.$store.getters["user/addRouters"][0].children[1].path : this.$route.path
      return path
    }
  }
}
</script>
<style scoped>
.el-menu {
  border-right: none !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
}
.el-menu-vertical-demo:is(.el-menu--collapse) {
  width: 70px;
}
.el-submenu .el-menu-item {
  padding: 0 0 0 25px !important;
  min-width: 0 !important;
}
.el-menu-item,
.el-submenu {
  border-left: rgba(0, 0, 0, 0) solid 4px !important;
  background-color: rgba(0, 0, 0, 0) !important;
  border-right: rgba(0, 0, 0, 0) solid 4px;
}
.el-submenu.el-submenu__title:hover {
  border-left-color: #33a2ef !important;
}

.el-menu-item:hover {
  border-left-color: #33a2ef !important;
}

.el-menu-item.is-active {
  border-left-color: #33a2ef !important;
}
</style>
