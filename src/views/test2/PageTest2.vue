<template>
  <div style="height: 100%">
    <div class="tree-box">
      <el-tree
        :data="tree"
        node-key="deptId"
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
        @node-click="handleNodeClick">
        <span slot-scope="{ data }" class="tree-line">
          <span class="iconStr">
            <TextTooltip :content="data.deptName"></TextTooltip>
          </span>
          <span class="icons">
            <i
              title="编辑"
              class="el-icon-edit icon"
              style="margin-right: 8px"></i>
            <i title="删除" class="el-icon-delete icon"></i>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
import { getDeptTree } from '@/api/user.js'

export default {
  name: 'PageTest2',
  data() {
    return {
      tree: null,
      defaultProps: {
        label: 'deptName',
        children: 'children',
      },
    }
  },
  created() {
    this.getDeptTree()
  },
  methods: {
    getDeptTree() {
      getDeptTree().then((res) => {
        this.tree = res.data
      })
    },
    handleNodeClick(node) {
      console.log('Node', node)
    },
  },
}
</script>
<style scoped lang="less">
.tree-box {
  width: 20%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 16px;
  height: calc(~'100% - 32px');
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
