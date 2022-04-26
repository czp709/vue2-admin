<template>
  <div class="login-wrap">
    <div class="ms-login1">
      <div class="title">找回密码</div>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]"
        >
          <el-input
            v-model="ruleForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="emailCode">
            <el-input
              v-model="ruleForm.code"
              placeholder="请输入验证码"
              style="margin-right:10px"
            ></el-input>
            <countdownBtn
              @click="emailCode"
              :rules="[{value:ruleForm.email,type:'email'}]"
            ></countdownBtn>
          </div>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button
          type="primary"
          @click="MatchCheck"
        >确认</el-button>
        <el-button
          type="primary"
          @click="$router.go(-1)"
          style="margin:10px 0"
        >返回上一页</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import countdownBtn from '@/components/countdownBtn'
export default {
    name: 'SchoolRetrievepassword',
    components:{
      countdownBtn
    },
    data () {
        return {
            ruleForm: {
                username: '',
                email: '',
                code: null
            },
        }
    },

    mounted () {

    },

    methods: {
        emailCode () {
            // 发送网络请求去发送验证码
        },
        MatchCheck () {
            // 点击确认执行的操作，通常情况下将用户信息和验证码发送到后端进行校验。
        }
    }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("../assets/bgc.webp");
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: cover;
  zoom: 1;
  -webkit-background-size: cover;
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
  left: 80%;
  top: 40%;
  width: 250px;
  height: 400px;
  margin: -150px 0 0 -190px;
  padding: 30px;
  border-radius: 15px;
  background: rgba(250, 250, 250, 0.568);
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ms-login1 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 400px;
  padding: 30px;
  border-radius: 15px;
  background: rgba(250, 250, 250, 0.568);
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: max-content;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.register {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px !important;
}

.el-link {
  font-size: 10px !important;
}

.emailCode {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.remember {
  margin: 3px 0 10px 0;
}

@media screen and (min-height: 550px) {
  .login-copyright {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
}

.popover {
  position: absolute;
  left: 10px;
  top: 50%;
  z-index: 2;
  width: 0 !important;
  height: 0 !important;
  padding: 0 !important;
  background-color: rgba(250, 250, 250, 0) !important;
}
</style>
