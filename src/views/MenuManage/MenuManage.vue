<template>
  <div class="page">
    <div class="tree-box">
      <el-tree
        :data="tree"
        node-key="menuId"
        draggable
        :default-expanded-keys="[0]"
        :expand-on-click-node="false"
        :props="defaultProps"
        @node-click="handleNodeClick"
        @node-drop="onNodeDrop">
        <span slot-scope="{ data }" class="tree-line">
          <span class="iconStr">
            <i v-if="data.menuType == 'M'" class="el-icon-folder icon"></i>
            <i v-if="data.menuType == 'C'" class="el-icon-document icon"></i>
            <TextTooltip :content="data.menuName"></TextTooltip>
          </span>
          <span class="icons">
            <i
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
import { deleteMenu, getMenuTree, sortMenu } from '@/api/menu'
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
            menuId: 0,
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
      this.$nextTick(() => {
        this.$refs.MenuForm.addMenu(data, sort + 1)
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
    onNodeDrop(node, insertNode, position) {
      let parentNode
      if (position !== 'inner') {
        parentNode = insertNode.parent.data
      } else {
        parentNode = insertNode.data
      }
      const parentId = parentNode.menuId
      const childSort = parentNode.children.map((item, index) => {
        return {
          id: item.menuId,
          orderNum: index + 1,
        }
      })
      sortMenu(parentId, childSort).catch(() => {
        this.getMenu()
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
  width: 300px;
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin-right: 16px;
  height: calc(~'100% - 32px');
}
.table {
  display: flex;
  flex-direction: column;
  flex: 1;
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
  .icon {
    font-size: 16px;
    margin-right: 4px;
  }
}
/deep/.icons {
  display: flex;
  flex-direction: row !important;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #2d8cf0;
}
</style>
