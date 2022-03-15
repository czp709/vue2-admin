<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="title">登录</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            type="password"
            placeholder="密码"
            show-password
            v-model="ruleForm.pwd"
            @keyup.enter.native="isShow = true"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button
          type="primary"
          @click="isShow = true"
          v-preventReClick
        >登录</el-button>
      </div>
      <div class="bottom_btn">
        <el-link
          type="primary"
          href="#/retrievePassword"
          :underline="false"
        >找回密码</el-link>
      </div>
      <!-- 滑动验证组件 -->
      <Vcode
        :show="isShow"
        @success="onSuccess"
        @close="isShow=false"
      />
    </div>
    <div style="position:fixed;bottom:0px;width:100%;background: rgba(250, 250, 250, .8);text-align: center;padding:5px">
      <a
        style="color:#666;font-size:12px"
        href="https://beian.miit.gov.cn/"
        target="_blank"
      >
        豫ICP备2021008006号-2</a>
    </div>
  </div>
</template>
<script>
import Vcode from "vue-puzzle-vcode";
export default {
    components: {
        Vcode
    },
    data: function () {
        return {
        // 滑动验证显示控制变量
            isShow: false,
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

    methods: {
        // 滑动验证成功
        onSuccess () {
            this.isShow = false
            this.login()
        },
        login () {
            const loading = this.$loading({
                lock: true,
                text: '登录中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            var data = this.ruleForm
            this.$postAPI('login', data).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    // 将用户信息写入VUEX
                    this.$store.dispatch('user/saveUserInfo', res).then(() => {
                        // 生成相应权限的路由
                        this.$store.dispatch('user/addRoutes')
                        this.$router.replace('/home')
                    })
                    this.$message({
                        showClose: true,
                        message: '登陆成功',
                        type: 'success'
                    })
                } else if (res.data.code == 400) {
                    this.$message.error(res.data.message);
                }
            })
        }
    },
    // 以下两个生命周期函数作用为提示试用账号密码，正式场景应删除掉
    mounted () {
      this.notifyId = this.$notify({
        message: '一级账号为admin,二级账号为visitor。密码皆随便输入',
        duration: 0
      });
    },
    beforeDestroy () {
      this.notifyId.close()
    }
}
</script>
<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("https://xiaoxiaoyu.club/pic/bgc.webp");
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
</style>
