<template>
  <el-tooltip
    v-bind="attrs"
    :content="content"
    :disabled="isShowTooltip"
    :style="{ width: width, maxWidth: maxWidth, minWidth: minWidth }"
    v-on="$listeners">
    <div class="over-flow" :style="customStyle" @mouseover="onMouseOver()">
      <span ref="refName">{{ content || '' }}</span>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: 'TextTooltip',
  props: {
    // 显示的文字内容
    content: {
      type: String,
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
      const parentWidth = this.$refs.refName.parentNode.offsetWidth
      const contentWidth = this.$refs.refName.offsetWidth
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

<style scoped>
.over-flow {
  text-align: left;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
