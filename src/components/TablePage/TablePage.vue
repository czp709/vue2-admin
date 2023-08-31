<template>
  <div ref="tablePage" class="tablePage-box">
    <div ref="filterCondition" style="padding-bottom: 8px">
      <el-form
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
            :placeholder="'请输入' + item.label"
            @keyup.enter.native="getList"></el-input>
        </el-form-item>
        <el-form-item class="search-btn">
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button @click="resetForm"> 重置 </el-button>
          <span v-if="filters.length > 4" class="expand" @click="filterExpand">
            <span>{{ !expand ? '展开' : '收起' }}</span>
            <i :class="!expand ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
          </span>
        </el-form-item>
      </el-form>
      <slot name="filterCondition"></slot>
    </div>

    <el-table
      ref="elTable"
      :height="tableHeight"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        v-for="item in columns"
        :key="item.key"
        align="center"
        :prop="item.key"
        :label="item.label"
        :width="item.width">
        <template slot-scope="scope">
          <RenderCell
            v-if="item.render"
            :render="item.render"
            :params="scope"></RenderCell>
          <span v-else-if="item.type == 'index'">
            {{ scope.$index + 1 }}
          </span>
          <TextTooltip
            v-else-if="item.tooltip"
            :content="String(scope.row[item.key])"
            text-align="center"></TextTooltip>
          <span v-else class="lableContent">{{ scope.row[item.key] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!options.hideActionBtn"
        align="center"
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button
            v-for="(btn, idx) in rowActionButton"
            :key="'actbtn' + idx"
            :type="btn.type || 'text'"
            :style="{ padding: '0 20px', ...btn.style }"
            :disabled="
              btn.disabled ||
              (btn.disabledByRow && btn.disabledByRow(scope.row))
            "
            :loading="btn.loading"
            @click="btn.func(scope.row, scope.$index)">
            {{ btn.textValue }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      ref="page"
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
    rowActionButton: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      filterData: {},
      otherFilters: {},
      page: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
      expand: false,
      // 表格默认高度
      tableHeight: 500,
      // 表头高度
      tableHeaderHeight: 54,
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
    optionsFilter() {
      return this.options.filter
    },
    lineHeight() {
      if (this.$refs.elTable.$el.querySelector('.el-table__row')) {
        return this.$refs.elTable.$el.querySelector('.el-table__row')[0]
          .clientHeight
      }
      return 54
    },
  },
  watch: {
    'page.pageNum': {
      handler() {
        this.getList()
      },
    },
    optionsFilter: {
      handler(val) {
        this.otherFilters = val
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    setTimeout(async () => {
      await this.setTableHeight()
      this.getList()
    }, 0)

    window.addEventListener('resize', this.setTableHeight)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setTableHeight)
  },
  methods: {
    resetForm() {
      this.filterData = {}
      this.otherFilters = {}
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      const func = this.options.apiFunc
      if (func) {
        this.page.pageSize = Math.floor(
          (Math.floor(this.tableHeight) + 32 - this.tableHeaderHeight) /
            this.lineHeight
        )
        func({ ...this.filterData, ...this.page, ...this.otherFilters }).then(
          (res) => {
            this.tableData = res.data
            this.total = res.total
            this.page.pageSize = Number(res.pageSize)
          }
        )
      }
    },
    // 设置表格高度
    setTableHeight() {
      return new Promise((resolve) => {
        this.$nextTick(() => {
          const tablePage = this.$refs.tablePage
          const tablePagePaddingTop = 16
          const tablePagePaddingBottom = 16
          const tablePageHeight = tablePage.clientHeight
          const filterHeight = this.$refs.filterCondition.offsetHeight || 0
          const pageHeight = this.options.hiddenPage
            ? 0
            : this.$refs.page.$el.offsetHeight + 16
          this.tableHeight =
            tablePageHeight -
            filterHeight - // 搜索高度
            pageHeight - // 分页器高度
            (tablePagePaddingTop + tablePagePaddingBottom) // padding
          if (this.tableHeight < 100) {
            this.tableHeight = 100
          }
          // 表头高度
          this.tableHeaderHeight = tablePage.getElementsByClassName(
            'el-table__header-wrapper'
          )[0].offsetHeight
          resolve()
        })
      })
    },
    filterExpand() {
      this.expand = !this.expand
      this.$emit('expand-change', this.expand)
      this.setTableHeight()
    },
  },
}
</script>
<style scoped lang="less">
.lableContent {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.el-form-item {
  display: flex;
  flex-direction: row;
}
.tablePage-box {
  height: 100%;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.el-pagination {
  text-align: right;
  margin: 8px 0;
}
.demo-form-inline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  transition: all 0.5 ease-in-out;
  grid-column-gap: 16px;
}
/deep/.el-form-item__content {
  width: 100%;
}
.search-btn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  grid-column-start: 5;
  /deep/.el-form-item__content {
    width: auto;
  }
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
