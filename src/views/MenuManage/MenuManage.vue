<template>
  <div class="page">
    <div class="tree-box">
      <el-tree
        :data="tree"
        node-key="menuId"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
        @node-click="handleNodeClick">
        <span slot-scope="{ data }" class="tree-line">
          <span class="iconStr">
            <TextTooltip :content="data.menuName"></TextTooltip>
          </span>
          <span class="icons">
            <i
              v-if="data.menuType == 'M'"
              title="新增"
              class="el-icon-circle-plus-outline icon"
              style="margin-right: 8px"
              @click.stop="addMenu(data)"></i>
            <i
              title="删除"
              class="el-icon-delete icon"
              @click.stop="deleteMenu(data)"></i>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="table">
      <MenuForm
        v-if="showForm"
        ref="MenuForm"
        :menu-tree="tree"
        @reload="getMenu"
        @close="close"></MenuForm>
      <el-empty v-else description="左侧选择父级新增"></el-empty>
    </div>
  </div>
</template>
<script>
import array2Tree from '@/utils/index'
import { cloneDeep } from 'lodash'
import MenuForm from './components/MenuForm'
import { deleteMenu, getMenuTree } from '@/api/menu'
export default {
  name: 'MenuMange',
  components: {
    MenuForm,
  },
  data() {
    return {
      tree: null,
      menu: null,
      defaultProps: {
        label: 'menuName',
        children: 'children',
      },
      showForm: false,
    }
  },
  created() {
    this.getMenu()
  },
  methods: {
    getMenu() {
      getMenuTree().then((res) => {
        const tree = [
          {
            menuId: '0',
            menuName: '根目录',
            menuType: 'M',
            children: [],
          },
        ]
        tree[0].children = array2Tree(cloneDeep(res.data), { id: 'menuId' })
        this.tree = tree
      })
    },
    handleNodeClick(node) {
      if (node.menuId == 0) {
        return
      }
      this.showForm = true
      this.$nextTick(() => {
        this.$refs.MenuForm.editMenu(node.menuId)
      })
    },
    addMenu(data) {
      this.showForm = true
      const sort = data.children?.length || 0
      console.log('sort', sort)
      this.$nextTick(() => {
        this.$refs.MenuForm.addMenu(data.menuId, sort + 1)
      })
    },
    close() {
      this.showForm = false
    },
    deleteMenu(data) {
      if (data.menuId == 0) {
        return
      }
      deleteMenu({ menuId: data.menuId }).then(() => {
        this.getMenu()
        if (data.menuId == this.$refs.MenuForm.ruleForm.menuId) {
          this.close()
        }
      })
    },
  },
}
</script>
<style scoped lang="less">
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tree-box {
  width: calc(~'30% - 40px');
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.2);
  padding: 16px;
  height: calc(~'100% - 32px');
}
.table {
  display: flex;
  flex-direction: column;
  width: calc(~'70% - 8px');
  height: 100%;
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.2);
}
/deep/.el-tree-node__content {
  box-sizing: border-box;
}
.tree-line {
  box-sizing: border-box;
  width: calc(~'100% - 24px');
  display: flex;
  flex-direction: row;
  justify-content: space-between !important;
  position: relative;
}

/deep/.iconStr {
  width: calc(~'100% - 40px') !important;
  display: flex;
  align-items: center;
  font-size: 14px;
}
/deep/.icons {
  display: flex;
  flex-direction: row !important;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
