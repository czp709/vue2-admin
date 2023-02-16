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
    <div v-if="retrieve" class="ms-login">
      <div class="title">登录</div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" type="text" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" placeholder="密码" show-password @keyup.enter.native="Vcode_show = true"></el-input>
        </el-form-item>
      </el-form>
      <el-button v-preventReClick type="primary" @click="Vcode_show = true">登录</el-button>
      <el-button type="text" @click="retrieve = false">找回密码</el-button>
      <!-- 滑动验证组件，正式使用请删除 -->
      <Vcode :show="Vcode_show" @success="login" @close="Vcode_show=false" ></Vcode>
    </div>
    <retrievePassword v-else v-on:isshow="retrieve = true"></retrievePassword>
    <!-- 友情链接 -->
    <div v-if="$store.state.controlLable.isPC" class="links">
      <span>
        Copyright©2022 vue2
      </span>
      <span>
        作者:
        <a href="http://github.com/czp709" target="_blank">@zipen</a>
      </span>
      <span>
        邮箱
        <a href="mailto:chenzhipeng709@163.com" target="_blank">chenzhipeng709@163.com</a>
      </span>
      <a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2021008006号</a>
    </div>
  </div>
</template>
<script>
import Vcode from 'vue-puzzle-vcode'
import retrievePassword from './retrievePassword.vue'
import user from '@/api/user'

export default {
  components: {
    Vcode,
    retrievePassword
  },
  data () {
    return {
      loading: false,
      // 滑动验证显示控制变量
      Vcode_show: false,
      retrieve: true,
      // 输入的账号密码
      ruleForm: {
        username: '',
        pwd: ''
      },
      // 输入框数据验证方式
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  // 以下两个生命周期函数作用为提示试用账号密码，正式场景应删除掉
  mounted () {
    this.notifyId = this.$notify({
      message: '一级账号为admin,二级账号为visitor。密码皆随便输入',
      duration: 0
    })
  },
  beforeDestroy () {
    this.notifyId.close()
  },

  methods: {
    login () {
      const that = this
      const data = this.ruleForm
      this.Vcode_show = false
      this.loading = true
      user.loginApi(data).then((res) => {
        if (res.data.code === 200) {
          // 将用户信息写入VUEX
          this.$store.dispatch('user/saveUserInfo', res).then(() => {
            this.$router.replace('/home')
          })
          that.loading = false
        }
      })
    }
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
