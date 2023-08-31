<template>
  <div class="page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录日志" name="loginLog">
        <TablePage
          v-if="activeName === 'loginLog'"
          ref="tablePage"
          :columns="columns"
          :filters="filters"
          :options="options"></TablePage>
      </el-tab-pane>
      <el-tab-pane label="全部日志" name="allLog">
        <TablePage
          v-if="activeName === 'allLog'"
          ref="tablePage"
          :columns="allLogColumns"
          :filters="allLogFilters"
          :options="allLogOptions"
          :rowActionButton="rowActionButton"></TablePage>
      </el-tab-pane>
    </el-tabs>
    <LogDetail ref="LogDetail"></LogDetail>
  </div>
</template>

<script>
import { loginLog, allLog } from '@/api/log'
import LogDetail from './components/logDetail'
export default {
  name: 'LogData',
  components: {
    LogDetail,
  },
  data() {
    return {
      activeName: 'loginLog',
    }
  },
  computed: {
    options() {
      return {
        apiFunc: loginLog,
        hideActionBtn: true,
      }
    },
    columns() {
      return [
        {
          type: 'index',
          label: '序号',
          width: '50',
        },
        {
          key: 'info_id',
          label: '日志ID',
        },
        {
          key: 'username',
          label: '登录账号',
        },
        {
          key: 'ip',
          label: 'IP',
        },
        {
          key: 'status',
          label: '状态',
          render: (h, params) => {
            return <span>{params.row.status == 0 ? '成功' : '失败'}</span>
          },
        },
        {
          key: 'msg',
          label: '详细信息',
        },
        {
          key: 'login_time',
          label: '登陆时间',
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
          key: 'ip',
          label: 'IP',
        },
        {
          key: 'status',
          label: '状态',
          render: (h, filterData) => {
            return (
              <el-select
                style='width:100%'
                v-model={filterData.status}
                placeholder='请选择'
                clearable>
                <el-option key='0' label='成功' value='0'></el-option>
                <el-option key='1' label='失败' value='1'></el-option>
              </el-select>
            )
          },
        },
      ]
    },
    allLogOptions() {
      return {
        apiFunc: allLog,
        // hideActionBtn: true,
      }
    },
    allLogColumns() {
      return [
        {
          type: 'index',
          label: '序号',
          width: '50',
        },
        {
          key: 'oper_id',
          label: '日志ID',
        },
        {
          key: 'username',
          label: '登录账号',
        },
        {
          key: 'ip',
          label: 'IP',
        },
        {
          key: 'method',
          label: '请求方法',
        },
        {
          key: 'url',
          label: '请求地址',
        },
        {
          key: 'query',
          label: 'query',
        },
        {
          key: 'body',
          label: 'body',
        },
        {
          key: 'result',
          label: '返回结果',
        },
        {
          key: 'status',
          label: '状态',
          render: (h, params) => {
            return <span>{params.row.status == 0 ? '成功' : '失败'}</span>
          },
        },
        {
          key: 'msg',
          label: '详细信息',
        },
        {
          key: 'use_time',
          label: '耗时（ms）',
        },
        {
          key: 'request_time',
          label: '时间',
        },
      ]
    },
    allLogFilters() {
      return [
        {
          key: 'username',
          label: '账号',
        },
        {
          key: 'ip',
          label: 'IP',
        },
        {
          key: 'status',
          label: '状态',
          render: (h, filterData) => {
            return (
              <el-select
                style='width:100%'
                v-model={filterData.status}
                placeholder='请选择'
                clearable>
                <el-option key='0' label='成功' value='0'></el-option>
                <el-option key='1' label='失败' value='1'></el-option>
              </el-select>
            )
          },
        },
        {
          key: 'method',
          label: '请求方法',
          labelWidth: '100px',
          render: (h, filterData) => {
            return (
              <el-select
                style='width:100%'
                v-model={filterData.method}
                placeholder='请选择'
                clearable>
                <el-option key='GET' label='GET' value='GET'></el-option>
                <el-option key='POST' label='POST' value='POST'></el-option>
                <el-option
                  key='DELETE'
                  label='DELETE'
                  value='DELETE'></el-option>
                <el-option key='PUT' label='PUT' value='PUT'></el-option>
                <el-option key='HEAD' label='HEAD' value='HEAD'></el-option>
              </el-select>
            )
          },
        },
        {
          key: 'url',
          label: '请求地址',
          labelWidth: '100px',
        },
      ]
    },
    rowActionButton() {
      return [
        {
          textValue: '详细',
          func: (row) => {
            this.showDetail(row)
          },
        },
      ]
    },
  },
  methods: {
    showDetail(row) {
      this.$refs.LogDetail.show(row, this.allLogColumns)
    },
  },
}
</script>
<style scoped lang="less">
.page {
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
}
.el-tab-pane,
.el-tabs {
  height: 100%;
  position: relative;
}
/deep/.el-tabs__content {
  height: ~'calc(100% - 55px)';
}
</style>
<style>
.el-tooltip__popper {
  max-width: 50%;
  max-height: 500px;
}
</style>
