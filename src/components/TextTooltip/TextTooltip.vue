<template>
  <el-tooltip
    v-bind="attrs"
    :content="content"
    :disabled="isShowTooltip || disabled"
    :style="{ maxWidth: maxWidth, minWidth: minWidth }"
    v-on="$listeners">
    <span
      class="over-flow"
      :style="customStyle"
      @mouseover.stop="onMouseOver()">
      <span ref="refName">{{ content || '' }}</span>
    </span>
  </el-tooltip>
</template>

<script>
export default {
  name: 'TextTooltip',
  props: {
    // 显示的文字内容
    content: {
      type: [String, Number],
      default: '',
    },
    // 设置超出省略提示宽度
    width: {
      type: String,
      default: '100%',
    },
    maxWidth: {
      type: String,
      default: undefined,
    },
    minWidth: {
      type: String,
      default: undefined,
    },
    textAlign: {
      type: String,
      default: 'left',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return { isShowTooltip: true }
  },

  computed: {
    attrs() {
      return {
        placement: 'top',
        transfer: true,
        'max-width': '200',
        ...this.$attrs,
      }
    },
    customStyle() {
      return {
        'text-align': this.textAlign,
      }
    },
  },

  methods: {
    onMouseOver() {
      const parentWidth =
        this.$refs.refName.parentNode.getBoundingClientRect().width
      const contentWidth = this.$refs.refName.getBoundingClientRect().width
      // 判断是否开启tooltip功能
      if (contentWidth > parentWidth) {
        this.isShowTooltip = false
      } else {
        this.isShowTooltip = true
      }
    },
  },
}
</script>

<style scoped lang="less">
.over-flow {
  text-align: left;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
  // line-height: 1;
}
</style>
