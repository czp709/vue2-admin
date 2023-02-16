<template>
  <div class="ms-login">
    <div class="title">找回密码</div>
    <el-form ref="ruleForm" :model="ruleForm" label-width="0px" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="email" :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="emailCode">
          <el-input v-model="ruleForm.code" placeholder="验证码" style="margin-right:10px"></el-input>
          <countdownBtn :rules="[{value:ruleForm.email,type:'email'}]" @click="emailCode"></countdownBtn>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="MatchCheck">确认</el-button>
    <el-button type="text" @click="$emit('isshow')">返回登陆</el-button>
  </div>
</template>
<script>
import countdownBtn from '@/components/countdownBtn'

export default {
  name: 'SchoolRetrievepassword',
  components: {
    countdownBtn
  },
  data () {
    return {
      ruleForm: {
        username: '',
        email: '',
        code: null
      }
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

<style>
.emailCode {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
