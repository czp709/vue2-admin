<template>
  <div>
    <div style="width: 200px">
      <TextTooltip
        content="This is a component based on el-tooltip secondary encapsulation. Tooltip will only be displayed when the length is exceeded.All attributes of el-tooltip are supported"></TextTooltip>
    </div>
    <div style="width: 200px">
      <TextTooltip
        effect="light"
        content="这是一个基于el-tooltip二次封装的组件，只有当超出长度后才会显示tooltip,支持el-tooltip所有属性"></TextTooltip>
    </div>
    <div>
      <TextTooltip
        content="这是一个基于el-tooltip二次封装的组件，只有当超出长度后才会显示tooltip,支持el-tooltip所有属性"></TextTooltip>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageTest1',
  data() {
    return {}
  },
}
</script>
<style scoped></style>
