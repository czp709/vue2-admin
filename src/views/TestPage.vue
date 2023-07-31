<template>
  <div>
    <IconChooser v-model="icon"></IconChooser>
  </div>
</template>

<script>
export default {
  name: 'TestPage',
  data() {
    return {
      icon: null,
    }
  },
  methods: {},
}
</script>
<style scoped lang="less"></style>
