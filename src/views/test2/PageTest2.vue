<template>
  <div class="page">
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
    <div class="table">
      <el-form
        ref="ruleForm"
        :inline="true"
        :model="formInline"
        class="demo-form-inline">
        <el-form-item label="账号">
          <el-input v-model="formInline.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formInline.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" clearable placeholder="状态">
            <el-option label="正常" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryUser">查询</el-button>
          <el-button @click="resetForm"> 重置 </el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="userId" label="用户ID"> </el-table-column>
        <el-table-column prop="username" label="账号"> </el-table-column>
        <el-table-column prop="nickname" label="昵称"> </el-table-column>
        <el-table-column prop="deptName" label="部门"> </el-table-column>
        <el-table-column prop="phone" label="手机"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.status == '0'"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">
              查看
            </el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getDeptTree, queryUser } from '@/api/user.js'

export default {
  name: 'PageTest2',
  data() {
    return {
      tree: null,
      defaultProps: {
        label: 'deptName',
        children: 'children',
      },
      formInline: {
        username: '',
        nickname: '',
        status: null,
        deptId: '',
      },
      tableData: [],
    }
  },
  created() {
    this.getDeptTree()
  },
  methods: {
    getDeptTree() {
      getDeptTree().then((res) => {
        this.tree = res.data
        this.queryUser()
      })
    },
    queryUser() {
      queryUser(this.formInline).then((res) => {
        this.tableData = res.data
      })
    },
    resetForm() {
      Object.assign(this.$data.formInline, this.$options.data().formInline)

      this.$nextTick(() => {
        this.queryUser()
      })
    },
    handleNodeClick(node) {
      this.formInline.deptId = node.deptId
      this.$nextTick(() => {
        this.queryUser()
      })
    },
  },
}
</script>
<style scoped lang="less">
.page {
  height: 100%;
  display: flex;
  flex-direction: row;
}
.tree-box {
  width: 20%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 16px;
  height: calc(~'100% - 32px');
}
.table {
  width: 80%;
  height: calc(~'100% - 32px');
  padding: 16px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
