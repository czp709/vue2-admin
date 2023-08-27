<template>
  <el-dialog title="新增用户" :visible.sync="dialogVisible" width="50%">
    <el-form
      ref="userInfo"
      label-width="80px"
      :model="userInfo"
      :rules="userInfoRule">
      <el-form-item label="组织">
        <el-cascader
          v-model="userInfo.deptId"
          style="width: 100%"
          :show-all-levels="false"
          :props="defaultProps"
          :options="deptTree"
          clearable
          filterable></el-cascader>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="nickname">
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="userInfo.sex">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="userInfo.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptTree, addUser } from '@/api/user.js'
export default {
  name: 'AddUser',
  data() {
    return {
      dialogVisible: false,
      userInfo: {
        deptId: '',
        username: '',
        password: '',
        nickname: '',
        sex: '',
        email: '',
        phone: '',
        remark: '',
      },
      defaultProps: {
        label: 'deptName',
        children: 'children',
        value: 'deptId',
        emitPath: false,
        checkStrictly: true,
      },
      userInfoRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        remark: [{ max: 500, message: '请输入备注', trigger: 'blur' }],
      },
      deptTree: null,
    }
  },
  mounted() {
    this.getDeptTree()
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    getDeptTree() {
      getDeptTree().then((res) => {
        this.deptTree = res.data
      })
    },
    submit() {
      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          addUser(this.userInfo).then(() => {
            this.$message.success('添加成功')
            this.dialogVisible = false
            this.$emit('refresh')
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style scoped lang="less"></style>
