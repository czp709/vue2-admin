<template>
  <div class="login-wrap bruce" v-loading="loading">
    <ul class="bubble-bgwall">
      <li>vue2</li>
      <li>vue2</li>
      <li>vue2</li>
      <li>vue2</li>
      <li>vue2</li>
      <li>vue2</li>
      <li>vue2</li>
      <li>vue2</li>
      <li>vue2</li>
      <li>vue2</li>
    </ul>
    <div class="ms-login">
      <div class="title">登录</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px">
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" placeholder="密码" show-password v-model="ruleForm.pwd" @keyup.enter.native="isShow = true"></el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button type="primary" @click="Vcode_show = true" v-preventReClick>登录</el-button>
      </div>
      <div class="bottom_btn">
        <el-link type="primary" href="#/retrievePassword" :underline="false">找回密码</el-link>
      </div>
      <!-- 滑动验证组件，正式使用请删除 -->
      <Vcode :show="Vcode_show" @success="login" @close="Vcode_show=false" />
    </div>
    <!-- 友情链接 -->
    <div class="links" v-if="$store.state.control_lable.isPC">
      <span>
        Copyright©2022 vue2
      </span>
      <span>
        作者:
        <a href="http://blog.chenzp.club" target="_blank">@zipen</a>
      </span>
      <span>
        邮箱
        <a href="mailto:chenzhipeng709@163.com" target="_blank">chenzhipeng709@163.com</a>
      </span>
      <a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021008006号</a>
      <span>
        友情链接:
        <a style="margin-left:10px" href="http://blog.briskgo.cn/" target="_blank">@yova's lab</a>
        <a style="margin-left:10px" href="http://blog.coderzlp.top" target="_blank">@zhai's blog</a>
      </span>
    </div>
  </div>
</template>
<script>
import Vcode from "vue-puzzle-vcode"
import user from "@/api/user"
export default {
  components: {
    Vcode
  },
  data: function () {
    return {
      loading: false,
      // 滑动验证显示控制变量
      Vcode_show: false,
      // 输入的账号密码
      ruleForm: {
        username: "",
        pwd: ""
      },
      // 输入框数据验证方式
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    }
  },

  methods: {
    login () {
      const that = this
      const data = this.ruleForm
      this.Vcode_show = false
      this.loading = true
      user.loginApi(data).then(res => {
        if (res.data.code === 200) {
          // 将用户信息写入VUEX
          this.$store.dispatch("user/saveUserInfo", res).then(() => {
            this.$router.replace("/home")
          })
          that.loading = false
        }
      })
    }
  },
  // 以下两个生命周期函数作用为提示试用账号密码，正式场景应删除掉
  mounted () {
    this.notifyId = this.$notify({
      message: "一级账号为admin,二级账号为visitor。密码皆随便输入",
      duration: 0
    })
  },
  beforeDestroy () {
    this.notifyId.close()
  }
}
</script>
<style scoped>
@import "../assets/style.css";
@import "../assets/style.scss";
.login-wrap {
  width: 100%;
  height: 100vh;
  z-index: 100 !important;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.title {
  font-size: 25px;
  text-align: center;
  color: rgb(147, 146, 157);
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: auto;
  padding: 30px;
  border-radius: 15px;
  background: rgba(250, 250, 250, 0.8);
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-form {
  margin: 40px 0;
}
.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.el-link {
  font-size: 10px !important;
}

.bottom_btn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
}
.links {
  position: fixed;
  bottom: 0px;
  width: 100%;
  background: rgba(250, 250, 250, 0.4);
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: #666;
  font-size: 12px;
}
a {
  color: #409eff;
  text-decoration: none;
}
a:visited {
  color: #409eff;
  text-decoration: none;
}
</style>
