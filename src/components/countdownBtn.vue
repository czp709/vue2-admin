<template>
  <el-button type="primary" @click="getemailCode" size="mini" round :disabled="smsFlag">{{sendTime}}</el-button>
</template>
<script>
export default {
  props: ["rules"],
  data () {
    return {
      sendTime: "获取验证码",
      snsMsgWait: 60,
      sendColor: "",
      smsFlag: false,
      regexs: { email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/ }
    }
  },
  methods: {
    getemailCode () {
      var that = this
      if (this.rules.length !== 0) {
        for (const item of this.rules) {
          if (!this.regexs[item.type].test(item.value)) {
            alert("校验未通过")
            return false
          }
        }
      }
      const countdown = new Promise(function (resolve, reject) {
        var inter = setInterval(function () {
          that.smsFlag = true
          that.sendColor = "#cccccc"
          that.sendTime = that.snsMsgWait + "s后重发"
          that.snsMsgWait = that.snsMsgWait - 1
          if (that.snsMsgWait < 0) {
            clearInterval(inter)
            that.sendTime = "获取验证码"
            that.snsMsgWait = 60
            that.sendColor = ""
            that.smsFlag = false
          }
        }, 1000)
        resolve()
      })
      countdown.then(function () {
        this.$emit("click")
      })
      return true
    }
  }
}
</script>
