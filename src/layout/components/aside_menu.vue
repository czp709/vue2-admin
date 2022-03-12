<template>
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="menuDefaultActive"
    background-color="#3d4657"
    active-text-color="#ffd04b"
    text-color="#fff"
    unique-opened
    router
    ref="asidemenu"
    :collapse="$store.state.user.menufold"
  >
    <template v-for="item in addRouters[0].children">
      <template v-if="item.children && !item.meta.hidden">
        <el-submenu
          :index="item.path"
          :key="item.path"
        >
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            class="subs"
            :index="child.path"
            v-for="child in item.children"
            :key="child.index"
          >
            <i :class="child.meta.icon"></i>
            <span slot="title">{{ child.meta.title }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
      <template v-else-if="!item.meta.hidden">
        <el-menu-item
          :index="item.path"
          :key="item.index"
        >
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
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
  min-height: 400px;
}
.el-submenu .el-submenu__title:hover {
  border-left: #33a2ef solid 6px !important;
  background-color: #3d4657 !important;
  color: #38b2ff !important;
}

.el-menu-item:hover {
  border-left: #33a2ef solid 6px !important;
  background-color: #3d4657 !important;
  color: #38b2ff !important;
}

.el-menu-item.is-active {
  border-left: #33a2ef solid 6px !important;
  background-color: #3d4657 !important;
  color: #38b2ff !important;
}
</style>
