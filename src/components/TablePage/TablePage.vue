<template>
  <div class="tablePage-box">
    <el-form
      ref="ruleForm"
      :inline="true"
      :model="filterData"
      label-width="50px"
      class="demo-form-inline">
      <el-form-item
        v-for="item in filterShow"
        :key="item.key"
        :label-width="item.labelWidth || '50px'"
        :label="item.label">
        <RenderCell
          v-if="item.render"
          :render="item.render"
          :params="filterData"></RenderCell>
        <el-input
          v-else
          v-model="filterData[item.key]"
          :placeholder="'请输入' + item.label"></el-input>
      </el-form-item>
      <el-form-item class="search-btn">
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button @click="resetForm"> 重置 </el-button>
        <span
          v-if="filters.length > 4"
          class="expand"
          @click="expand = !expand">
          <span>{{ !expand ? '展开' : '收起' }}</span>
          <i :class="!expand ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
        </span>
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
      expand: false,
    }
  },
  computed: {
    filterShow() {
      if (this.filters.length < 5) {
        return this.filters
      }
      if (!this.expand) {
        return this.filters.slice(0, 4)
      }
      return this.filters
    },
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
.el-form-item {
  display: flex;
  flex-direction: row;
}
.tablePage-box {
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
.demo-form-inline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  transition: all 0.5 ease-in-out;
}
.search-btn {
  text-align: right;
  grid-column-start: 5;
  .expand {
    display: inline-block;
    width: 56px;
    margin-left: 8px;
    color: #2d8cf0;
    cursor: pointer;
    user-select: none;
    font-size: 12px;
    margin-left: 8px;
  }
}
/deep/.el-input--suffix {
  .el-input__inner {
    padding-right: 0;
  }
}
</style>
