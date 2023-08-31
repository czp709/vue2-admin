<template>
  <span>
    <el-submenu
      v-if="menuData.visible == 0"
      :key="menuData.menuId"
      :index="'/' + menuData.path"
      @mouseover.stop>
      <div slot="title" class="title">
        <i v-if="menuData.icon" :class="menuData.icon" class="folder-icon"></i>
        <TextTooltip
          placement="right"
          :content="menuData.menuName"></TextTooltip>
      </div>

      <template v-for="child in menuData.children">
        <template v-if="child.menuType == 'M'">
          <MenuItem :key="child.menuId" :menu-data="child"></MenuItem>
        </template>
        <template v-else>
          <el-menu-item :key="child.menuId" :index="'/' + child.path">
            <div :class="{ title: true, padding: child.isFrame == 0 }">
              <i v-if="child.icon" :class="child.icon"></i>
              <TextTooltip :content="child.menuName"></TextTooltip>
              <i v-if="child.isFrame == 0" class="el-icon-link"></i>
            </div>
            <span v-if="$store.state.controlLable.menufold" slot="title">
              {{ child.menuName }}
            </span>
          </el-menu-item>
        </template>
      </template>
    </el-submenu>
  </span>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped lang="less">
.folder-icon {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
/deep/.el-submenu__title * {
  vertical-align: middle;
}
/deep/.el-submenu__title i {
  vertical-align: calc(~'-50% + 5px');
}
.title {
  .over-flow {
    width: calc(~'100% - 42px');
  }
}
.padding {
  .over-flow {
    width: calc(~'100% - 66px');
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu-vertical-demo:is(.el-menu--collapse) {
  width: auto;
  span {
    li {
      /deep/.el-submenu__title {
        display: flex;
        align-items: center;
        .el-submenu__icon-arrow {
          display: none;
        }
        .el-tooltip {
          display: none;
        }
      }
    }
  }
}
.el-submenu {
  position: relative;
  .el-menu-item {
    padding-right: 0;
  }
}
.el-submenu.is-active:after {
  content: '';
  display: block;
  width: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  color: #409eff !important;
  background: #409eff;
}
.el-submenu.is-active[aria-expanded='true']:after {
  content: '';
  display: block;
  width: 2px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: transparent;
}
</style>
