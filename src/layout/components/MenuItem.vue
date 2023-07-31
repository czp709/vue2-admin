<template>
  <el-submenu
    v-if="menuData.visible == 0"
    :key="menuData.menuId"
    :index="'/' + menuData.path">
    <div slot="title" class="folder-title">
      <i v-if="menuData.icon" :class="menuData.icon" class="folder-icon"></i>
      <TextTooltip
        placement="right"
        effect="light"
        :content="menuData.menuName"></TextTooltip>
    </div>

    <template v-for="child in menuData.children">
      <template v-if="child.menuType == 'M'">
        <MenuItem :key="child.menuId" :menu-data="child"></MenuItem>
      </template>
      <template v-else>
        <el-menu-item :key="child.menuId" :index="'/' + child.path">
          <i v-if="child.icon" :class="child.icon"></i>
          <div slot="title" class="title">
            <TextTooltip :content="child.menuName"></TextTooltip>
            <i v-if="child.isFrame == 0" class="el-icon-link"></i>
          </div>
        </el-menu-item>
      </template>
    </template>
  </el-submenu>
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
.title {
  float: right;
  width: calc(~'100% - 30px');
  display: flex;
  flex-direction: row;
  align-items: center;
}
.folder-title:extend(.title) {
  float: left;
  width: calc(~'100% - 20px');
  .folder-icon {
    display: inline-block;
    margin-left: 3px;
    margin-right: 5px;
    font-size: 18px;
  }
}
.el-menu-item {
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
.el-submenu {
  position: relative;
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
