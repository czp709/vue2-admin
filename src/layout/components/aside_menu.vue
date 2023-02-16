<template>
  <el-menu
    ref="asidemenu"
    class="el-menu-vertical-demo"
    :default-active="menuDefaultActive"
    :background-color="$store.state.aside_color"
    :text-color="$store.state.aside_text_color"
    unique-opened
    router
    :collapse="$store.state.controlLable.menufold">
    <template v-for="item in addRouters[0].children">
      <el-submenu
        v-if="item.children && !item.meta.hidden"
        :key="item.path"
        :index="item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.index"
          :index="child.path">
          <i :class="child.meta.icon"></i>
          <span slot="title">{{ child.meta.title }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        v-else-if="!item.meta.hidden"
        :key="item.index"
        :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AsideMenu',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      addRouters: 'user/addRouters',
    }),
    menuDefaultActive() {
      const path =
        this.$route.path === '/home'
          ? this.$store.getters['user/addRouters'][0].children[1].path
          : this.$route.path
      return path
    },
  },
}
</script>
<style scoped>
.el-menu {
  border-right: 0 !important;
  padding: 0 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu-vertical-demo:is(.el-menu--collapse) {
  width: auto;
}

.el-sub-menu__title,
.el-menu-item {
  min-width: 0 !important;
  padding: 0 20px !important;
  margin-bottom: 3px !important;
  border-radius: 10px !important;
}

.el-sub-menu {
  padding: 0 5px !important;
  min-width: 0 !important;
}

.el-menu-item,
.el-submenu {
  border-left: rgba(0, 0, 0, 0) solid 4px !important;
  border-right: rgba(0, 0, 0, 0) solid 4px !important;
  background-color: rgba(0, 0, 0, 0) !important;
}

.el-menu-item.is-active,
.el-submenu.el-submenu__title:hover {
  background-color: #33a2ef !important;
  color: white !important;
  border-radius: 10px !important;
}

.el-menu-item:hover {
  background-color: #33a2ef !important;
}

.el-menu--popup {
  padding: 5px !important;
}

.el-popper,
.is-pure,
.is-light {
  border: none !important;
  border-radius: 10px;
}
</style>
