<template>
  <el-menu class="el-menu-demo" mode="horizontal" unique-opened router>
    <template v-for="item in List">
      <el-submenu v-if="item.children && !item.meta.hidden" :key="item.index" :index="item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.index" class="subs" :index="child.path">
          <i :class="child.meta.icon"></i>
          {{ child.meta.title }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :key="item.index" :index="item.path">
        <i :class="item.meta.icon"></i>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopHeader',
  data () {
    return {
      screenWidth: document.documentElement.clientWidth || document.documentElement.offsetWidth || document.body.offsetWidth || window.innerWidth
    }
  },
  methods: {},
  computed: {
    ...mapGetters({
      addRouters: 'user/addRouters'
    }),
    List () {
      return this.addRouters[0].children.filter((item) => {
        if (!item.meta.hidden) {
          return true
        }
        return false
      })
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
.header {
  justify-content: space-between !important;
}
</style>
