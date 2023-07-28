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
      <TablePage
        ref="tablePage"
        :columns="columns"
        :filters="filters"
        :options="options"></TablePage>
    </div>
  </div>
</template>
<script>
import { getDeptTree, queryUser, changeStatus } from '@/api/user.js'

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
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    }
  },
  computed: {
    options() {
      return {
        apiFunc: queryUser,
      }
    },
    columns() {
      return [
        {
          key: 'userId',
          label: '用户ID',
        },
        {
          key: 'username',
          label: '账号',
        },
        {
          key: 'nickname',
          label: '昵称',
        },
        {
          key: 'deptName',
          label: '部门',
        },
        {
          key: 'phone',
          label: '手机',
        },
        {
          key: 'email',
          label: '邮箱',
        },
        {
          key: 'status',
          label: '状态',
          render: (h, params) => {
            return h('el-switch', {
              props: {
                activeColor: '#13ce66',
                inactiveColor: '#ff4949',
                value: params.row.status == 0,
              },
              on: {
                change: (newStatus) => {
                  this.changeStatus(params.row, newStatus)
                },
              },
            })
          },
        },
      ]
    },
    filters() {
      return [
        {
          key: 'username',
          label: '账号',
        },
        {
          key: 'nickname',
          label: '昵称',
        },
      ]
    },
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
    handleNodeClick(node) {
      this.formInline.deptId = node.deptId
      this.$nextTick(() => {
        this.$refs.tablePage.getList()
      })
    },
    changeStatus(row, newStatus) {
      const data = {
        userId: row.userId,
        status: newStatus ? 0 : 1,
      }
      changeStatus(data).then(() => {
        this.$refs.tablePage.getList()
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
  width: calc(~'20% - 40px');
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.2);
  padding: 16px;
  height: calc(~'100% - 32px');
}
.table {
  display: flex;
  flex-direction: column;
  width: calc(~'80% - 40px');
  height: calc(~'100% - 32px');
  padding: 16px;
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
.el-pagination {
  text-align: right;
  margin: 8px 0;
}
</style>
