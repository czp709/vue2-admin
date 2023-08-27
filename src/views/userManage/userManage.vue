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
          <!-- <span class="icons">
            <i
              title="编辑"
              class="el-icon-edit icon"
              style="margin-right: 8px"></i>
            <i title="删除" class="el-icon-delete icon"></i>
          </span> -->
        </span>
      </el-tree>
    </div>
    <div class="table">
      <TablePage
        ref="tablePage"
        :columns="columns"
        :filters="filters"
        :options="options">
        <template #filterCondition>
          <div>
            <el-button type="primary" @click="addUser"> 新增用户 </el-button>
          </div>
        </template>
      </TablePage>
    </div>
    <AddUser ref="addUser" @refresh="$refs.tablePage.getList()"></AddUser>
  </div>
</template>
<script>
import { getDeptTree, queryUser, changeStatus } from '@/api/user.js'
import AddUser from './components/addUser.vue'
export default {
  name: 'DepartManage',
  components: {
    AddUser,
  },
  data() {
    return {
      tree: null,
      defaultProps: {
        label: 'deptName',
        children: 'children',
      },
      deptId: '',
    }
  },
  computed: {
    options() {
      return {
        apiFunc: queryUser,
        hideActionBtn: true,
        filter: {
          deptId: this.deptId,
        },
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
          render: (h, filterData) => {
            return (
              <el-select
                v-model={filterData.status}
                placeholder='请选择'
                clearable>
                <el-option key='0' label='启用' value='0'></el-option>
                <el-option key='1' label='禁用' value='1'></el-option>
              </el-select>
            )
          },
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
      })
    },
    handleNodeClick(node) {
      this.deptId = node.deptId
      this.$nextTick(() => {
        this.$refs.tablePage?.getList()
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
    addUser() {
      this.$refs.addUser.show()
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
.el-tree {
  padding: 16px;
}
.tree-box {
  width: 300px;
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.2);
  height: 100%;
  margin-right: 16px;
}
.table {
  position: relative;
  width: calc(~'100% - 300px');
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
.el-pagination {
  text-align: right;
  margin: 8px 0;
}
</style>
