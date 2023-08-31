<template>
  <div class="aside">
    <div class="aside_top">
      <img :src="system.logo" title="品牌logo" />
      <div class="title">
        <TextTooltip
          v-show="!$store.state.controlLable.menufold"
          :content="system.name"></TextTooltip>
      </div>
    </div>
    <Asidemenu></Asidemenu>
  </div>
</template>
<script>
import asidemenu from '@/layout/components/aside_menu'
import Setting from '../../utils/setting'

export default {
  name: 'HomeAside',
  components: {
    Asidemenu: asidemenu,
  },
  data() {
    return {
      system: {
        ...Setting.system,
      },
    }
  },
  methods: {},
}
</script>
<style scoped>
.aside_top {
  /* color: white; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  height: 60px;
  border-bottom: 1px solid #dcdfe6;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.aside_top img {
  width: 40px;
  border-radius: 10px;
}
.title {
  max-width: 140px;
  margin-left: 10px;
  font-size: 24px;
  color: #8e8e8e;
  display: flex;
  align-items: center;
}
.aside_top span {
  margin-left: 10px;
  font-size: 24px;
}
.aside {
  box-shadow: 1px 0 6px rgba(0, 0, 0, 0.2);
}
</style>
