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

        <TextTooltip :content="item.menuName"></TextTooltip>
        <i v-if="item.isFrame == 0" class="el-icon-link"></i>

        <span v-if="$store.state.controlLable.menufold" slot="title">
          {{ item.menuName }}
        </span>
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
        return state.user.route
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
  display: inline-block;
  height: 100%;
  .over-flow {
    width: calc(~'100% - 24px');
  }
}
.padding {
  .over-flow {
    width: calc(~'100% - 48px');
  }
}
/deep/.el-menu-item [class^='el-icon-'],
/deep/.el-submenu [class^='el-icon-'] {
  vertical-align: calc(~'-50% + 5px');
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
/deep/.el-menu--collapse > div > .el-submenu .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}

/deep/.el-menu--collapse > div > .el-menu-item span {
  display: none;
}
/deep/.el-menu--collapse > div > .el-menu-item {
  .el-tooltip {
    padding: 0 !important;
    display: inline-flex !important;
    justify-content: center;
    align-items: center;
  }
}
/deep/.el-icon-link {
  position: absolute;
  right: 8px;
  top: 50%;
  padding-top: 6px !important;
  transform: translateY(-50%);
}
</style>
