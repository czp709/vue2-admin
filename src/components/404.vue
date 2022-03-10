<template>
  <div>
    <div class="error">
      <!-- 图片可保存到本地 -->
      <img src="../assets/404.png">
      <p>抱歉！你访问的页面不存在 :( </p>
      <span
        class="back"
        @click="go()"
      >返回上页</span>
    </div>

  </div>
</template>

<script>
export default {
    methods: {
        go: function () {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.error {
  position: absolute;
  top: 50%;
  margin-top: -250px;
  width: calc(100vw - 220px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.error img {
  display: block;
  margin: 0 auto;
  width:100%;
}
.error p {
  text-align: center;
  font-size: 16px !important;
  font-weight: 600;
}
.back {
  display: block;
  width: 100px;
  text-align: center;
  margin: 20px auto;
  padding: 8px 0;
  border: 1px solid #333;
  border-radius: 100px;
  cursor: pointer;
  color: rgb(27, 27, 27);
  font-size: 15px;
}
</style>
