<template>
  <div class="aside">
    <div class="aside_top">
      <img src="@/assets/logo.png" title="品牌logo" />
      <span v-show="!$store.state.controlLable.menufold">Admin</span>
    </div>
    <Asidemenu></Asidemenu>
  </div>
</template>
<script>
import asidemenu from '@/layout/components/aside_menu'

export default {
  name: 'HomeAside',
  components: {
    Asidemenu: asidemenu,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped>
.aside_top {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 10px;
}
.aside_top img {
  width: 47px;
  border-radius: 10px;
}
.aside_top span {
  margin-left: 10px;
  font-size: 24px;
}
</style>
