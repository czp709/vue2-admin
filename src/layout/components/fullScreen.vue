<template>
  <div class="fullscreen">
    <el-tooltip class="item" effect="dark" :content="`点击${fullscreen ? '关闭':'打开'}全屏显示`" placement="bottom">
      <svg v-if="!fullscreen" @click="handleFullScreen" t="1652066238767" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1912" width="20" height="20">
        <path d="M240.8 196l178.4 178.4-45.6 45.6-177.6-179.2-68 68V128h180.8l-68 68z m133.6 408.8L196 783.2 128 715.2V896h180.8l-68-68 178.4-178.4-44.8-44.8zM715.2 128l68 68-178.4 178.4 45.6 45.6 178.4-178.4 68 68V128H715.2z m-65.6 476.8l-45.6 45.6 178.4 178.4-68 68H896V715.2l-68 68-178.4-178.4z" p-id="1913"></path>
      </svg>
      <svg v-else @click="handleFullScreen" t="1652066251196" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2061" width="20" height="20">
        <path d="M142.4 96.8l-44.8 44.8 173.6 174.4-68 68H384V203.2l-67.2 67.2zM752.8 316l173.6-174.4-44.8-44.8-174.4 173.6-67.2-67.2V384h180.8zM270.4 707.2l-169.6 170.4 44.8 49.6 170.4-174.4 68 68V640H203.2zM820.8 640H640v180.8l68-68 170.4 174.4 44.8-49.6-169.6-170.4z" p-id="2062"></path>
      </svg>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fullscreen: false
    }
  },
  methods: {
    handleFullScreen () {
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  }
}
</script>

<style>
.fullscreen {
  height: 20px;
  margin: 0 auto;
}
</style>
