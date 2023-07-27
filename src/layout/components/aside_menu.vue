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
    <template v-for="item in menuTree">
      <el-submenu
        v-if="item.children && item.visible == 0"
        :key="item.path"
        :index="'/' + item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.index"
          :index="'/' + child.path">
          <i :class="child.icon"></i>
          <span slot="title">{{ child.menuName }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        v-else-if="item.visible == 0"
        :key="item.index"
        :index="'/' + item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { mapState } from 'vuex'
import array2Tree from '@/utils/index.js'
import { cloneDeep } from 'lodash'

export default {
  name: 'AsideMenu',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      menu: (state) => {
        return state.user.level
      },
    }),
    menuDefaultActive() {
      const path =
        this.$route.path === '/home'
          ? this.menuTree[0].children
            ? '/' + this.menuTree[0].children[0].path
            : '/' + this.menuTree[0].path
          : this.$route.path
      return path
    },
    menuTree() {
      return array2Tree(cloneDeep(this.menu), { id: 'menuId' })
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
