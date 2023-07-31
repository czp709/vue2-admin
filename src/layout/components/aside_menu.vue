<template>
  <el-menu
    ref="asidemenu"
    class="el-menu-vertical-demo"
    unique-opened
    router
    :default-active="menuDefaultActive"
    :collapse="$store.state.controlLable.menufold">
    <template v-for="item in menuTree">
      <MenuItem
        v-if="item.menuType == 'M'"
        :key="item.path"
        :menu-data="item"></MenuItem>
      <el-menu-item
        v-else-if="item.visible == 0"
        :key="item.menuId"
        :index="'/' + item.path">
        <i v-if="item.icon" :class="item.icon"></i>
        <div slot="title" class="title">
          <TextTooltip :content="item.menuName"></TextTooltip>
          <i v-if="item.isFrame == 0" class="el-icon-link"></i>
        </div>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { mapState } from 'vuex'
import array2Tree from '@/utils/index.js'
import { cloneDeep } from 'lodash'
import Setting from '../../utils/setting'
import MenuItem from './MenuItem.vue'

export default {
  name: 'AsideMenu',
  components: {
    MenuItem,
  },
  data() {
    return {
      Setting,
    }
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
<style scoped lang="less">
.title {
  float: right;
  width: calc(~'100% - 30px');
  display: flex;
  flex-direction: row;
  align-items: center;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu-vertical-demo:is(.el-menu--collapse) {
  width: auto;
}
.el-menu {
  border: none;
}
/deep/.el-sub-menu__title {
  padding: 0 20px !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.el-menu-item {
  padding: 0 20px !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
}

/deep/.el-menu-item.is-active:after {
  content: '';
  display: block;
  width: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #2d8cf0;
}
</style>
