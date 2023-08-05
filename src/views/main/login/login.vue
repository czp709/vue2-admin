<template>
  <div v-loading="loading" class="login-wrap bruce">
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
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="0px">
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            type="text"
            placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="密码"
            show-password></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            v-model="ruleForm.captcha"
            style="width: 50%"
            type="text"
            placeholder="验证码"
            @keyup.enter.native="login"></el-input>
          <img class="captcha" :src="captchaImg" @click="getCaptcha" />
        </el-form-item>
      </el-form>
      <el-button v-preventReClick type="primary" @click="login">
        登录
      </el-button>
    </div>
    <!-- 友情链接 -->
    <div v-if="$store.state.controlLable.isPC" class="links">
      <span> Copyright©2022 vue2 </span>
      <span>
        作者:
        <a href="http://github.com/czp709" target="_blank">@zipen</a>
      </span>
      <span>
        邮箱
        <a href="mailto:chenzhipeng709@163.com" target="_blank">
          chenzhipeng709@163.com
        </a>
      </span>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        豫ICP备2021008006号
      </a>
    </div>
  </div>
</template>
<script>
import { loginApi, getCaptcha } from '@/api/user'
import Cookies from 'js-cookie'
import JsEncrypt from 'jsencrypt'
import { _pubKey } from '@/utils/rsaEncrypt'

export default {
  name: 'LoginPager',
  data() {
    return {
      loading: false,
      // 输入的账号密码
      ruleForm: {
        username: '',
        password: '',
        captcha: '',
        captchaId: '',
      },
      captchaImg: '',
      // 输入框数据验证方式
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      getCaptcha({ id: this.ruleForm.captchaId }).then((res) => {
        this.ruleForm.captchaId = res.data.id
        this.captchaImg = res.data.img
      })
    },
    login() {
      this.loading = true
      const en = new JsEncrypt()
      en.setPublicKey(_pubKey)
      const password = en.encrypt(this.ruleForm.password)
      loginApi({ ...this.ruleForm, password })
        .then(async (res) => {
          if (res.code === 200) {
            Cookies.set('token', res.token)
            localStorage.setItem('refreshToken', res.refresh_token)
            // 将用户信息写入VUEX
            await this.$store.dispatch('user/saveUserInfo', res.data)
            if (res.role) {
              await this.$store.commit('user/saveUserMenu', res.role)
            }
            this.$router.replace('/home')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style scoped>
@import '../../../assets/style.css';
@import '../../../assets/style.scss';
</style>
<style scoped lang="less">
.login-wrap {
  width: 100%;
  height: 100vh;
  z-index: 100 !important;
}

.title {
  font-size: 25px;
  text-align: center;
  color: rgb(73, 73, 77);
  margin-bottom: 10px;
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
  background: rgba(250, 250, 250, 0.3);
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  -webkit-animation: fadenum 1.5s ease;
  -moz-animation: fadenum 1.5s ease;
  animation: fadenum 1.5s ease;
}
@-webkit-keyframes fadenum {
  /*设置内容由显示变为隐藏*/
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes fadenum {
  /*设置内容由显示变为隐藏*/
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes fadenum {
  /*设置内容由显示变为隐藏*/
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadenum {
  /*设置内容由显示变为隐藏*/
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.el-form {
  margin: 20px 0;
}
/deep/.el-form-item__content {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.captcha {
  height: 100%;
  width: 50%;
  margin-left: 8px;
  object-fit: contain;
}
.login-btn button {
  width: 100%;
  height: 36px;
}

.el-link {
  font-size: 10px !important;
  margin-top: 20px;
  text-align: center;
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
