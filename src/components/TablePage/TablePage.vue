<template>
  <div>
    <el-form
      ref="ruleForm"
      :inline="true"
      :model="filterData"
      class="demo-form-inline">
      <el-form-item v-for="item in filters" :key="item.key" label="账号">
        <RenderCell v-if="item.render"></RenderCell>
        <el-input
          v-else
          v-model="filterData[item.key]"
          placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button @click="resetForm"> 重置 </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%; flex: 1">
      <el-table-column
        v-for="item in columns"
        :key="item.key"
        align="center"
        :prop="item.key"
        :label="item.label">
        <template slot-scope="scope">
          <RenderCell
            v-if="item.render"
            :render="item.render"
            :params="scope"></RenderCell>
          <TextTooltip
            v-else
            :content="String(scope.row[item.key])"
            text-align="center"></TextTooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="">
          <el-button type="text" size="small"> 查看 </el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="page.pageNum"
      :page-size="page.pageSize"
      layout="total,prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import RenderCell from './render'

export default {
  name: 'TablePage',
  components: {
    RenderCell,
  },
  props: {
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
    filters: {
      type: Array,
      default: () => {
        return []
      },
    },
    options: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      filterData: {},
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    resetForm() {
      this.filterData = {}
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const func = this.options.apiFunc
      if (func) {
        func({ ...this.filterData, ...this.page, ...this.options.filter }).then(
          (res) => {
            this.tableData = res.data
            this.total = res.total
            this.page.pageSize = Number(res.pageSize)
          }
        )
      }
    },
  },
}
</script>
<style scoped lang="less">
.table {
  display: flex;
  flex-direction: column;
  width: calc(~'100% - 32px');
  height: calc(~'100% - 32px');
  padding: 16px;
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.2);
}
.el-pagination {
  text-align: right;
  margin: 8px 0;
}
</style>
