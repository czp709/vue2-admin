<template>
  <div>页面2</div>
</template>
<script>
import { getDeptTree } from '@/api/user.js'

export default {
  name: 'PageTest2',
  data() {
    return {
      tree: null,
    }
  },
  mounted() {
    getDeptTree().then((res) => {
      this.tree = res.data
    })
  },
}
</script>
<style scoped></style>
