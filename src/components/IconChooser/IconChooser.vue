<!--
 * @Author: runmin
 * @Date: 2022-01-11 08:56:09
 * @LastEditors: chenzhipeng_zz
 * @LastEditTime: 2023-07-31 17:23:39
 * @Description:图标选择器 1.0.0
-->
<template>
  <el-popover
    v-model="show"
    content="content"
    placement="bottom"
    style="width: 100%"
    transfer>
    <el-input
      slot="reference"
      :value="value"
      clearable
      icon="ios-arrow-down"
      style="width: 100%"
      placeholder="请选择图标"
      readonly
      @input="handleInput">
      <span slot="prepend">
        <i :class="value || defaultIcon" style="font-size: 20px"></i>
      </span>
    </el-input>
    <div>
      <el-input v-model="search" clearable placeholder="搜索..."></el-input>
      <el-row
        :gutter="24"
        :style="{ minwidth: popwidth + 'px' }"
        class="rowStyle">
        <el-col
          v-for="icon in faIconsFilter"
          :key="icon"
          :span="4"
          style="cursor: pointer">
          <i
            :class="icon"
            style="font-size: 30px"
            @click="changeIcon(icon)"></i>
        </el-col>
      </el-row>
    </div>
  </el-popover>
</template>
<script>
import faIconsList from './icons.js'

export default {
  name: 'IconChooser',

  components: {},
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    popwidth: {
      type: Number,
      default: 360,
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      search: '',
      show: false,
      defaultIcon: 'el-icon-menu',
    }
  },
  computed: {
    faIconsFilter() {
      if (this.search == null || this.search.length == 0) {
        return faIconsList
      }
      return faIconsList.filter((item) => {
        return item.includes(this.search)
      })
    },
  },

  methods: {
    changeIcon(icon) {
      this.show = false
      this.$emit('input', icon)
    },
    handleInput(e) {
      this.$emit('input', e)
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.ivu-poptip-rel {
  width: 100%;
}
.rowStyle {
  line-height: 30px;
  max-height: 300px;
  min-width: 360px;
  max-width: 360px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 14px;
  margin: 0 !important;
}
</style>
