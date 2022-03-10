<template>
  <div class="aside1">
    <Avatar @changepwd='dialogFormVisible = true'></Avatar>
    <asidemenu></asidemenu>
  </div>
</template>
<script>
import asidemenu from "@/layout/components/aside_menu"
import Avatar from "./avatar.vue"
export default {
  components: {
    asidemenu,
    Avatar
  },
  name: "Aside",
  data () {
    return {
    }
  },
  methods: {
    // 修改密码点击确定执行的函数
    changepwd () {

    }
  }
}
</script>
<style scoped>
  .aside1 {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: space-around;
  }
</style>
