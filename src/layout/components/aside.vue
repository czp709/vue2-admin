<template>
  <div class="aside">
    <div class="aside_top">
      <img src="@/assets/logo.png">
      <span v-show="!$store.state.user.menufold">Admin</span>
    </div>
    <asidemenu></asidemenu>
  </div>
</template>
<script>
import asidemenu from "@/layout/components/aside_menu"
export default {
  components: {
    asidemenu
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
  /* .aside {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: space-around;
  } */
  .aside_top{
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin-bottom: 10px;
  }
  .aside_top img{
    width: 45px;
    border-radius: 10px;
  }
  .aside_top span{
    margin-left: 10px;
    font-size: 20px;
  }
</style>
