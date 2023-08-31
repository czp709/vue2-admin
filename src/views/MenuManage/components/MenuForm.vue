<template>
  <div class="MenuForm">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item label="名称" prop="menuName">
        <el-input v-model="ruleForm.menuName"></el-input>
      </el-form-item>
      <el-form-item label="父菜单" prop="parentId">
        <el-cascader
          v-model="ruleForm.parentId"
          style="width: 100%"
          :show-all-levels="false"
          :props="defaultProps"
          :options="menuTree"
          clearable
          filterable></el-cascader>
      </el-form-item>
      <el-form-item label="显示顺序" prop="orderNum">
        <el-input-number
          v-model="ruleForm.orderNum"
          disabled
          style="width: 100%"
          :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-select v-model="ruleForm.menuType" style="width: 100%">
          <el-option
            :disabled="parentType != 'M'"
            label="菜单"
            value="M"></el-option>
          <el-option
            :disabled="parentType == 'C'"
            label="非菜单"
            value="C"></el-option>
          <el-option
            label="权限"
            value="F"
            :disabled="parentType != 'C'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="路由地址" prop="path">
        <el-input v-model="ruleForm.path"></el-input>
      </el-form-item>
      <el-form-item label="组件路径" prop="component">
        <el-input v-model="ruleForm.component"></el-input>
      </el-form-item>
      <el-form-item label="组件参数" prop="query">
        <el-input v-model="ruleForm.query"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <IconChooser v-model="ruleForm.icon"></IconChooser>
      </el-form-item>
      <div class="MenuForm-switch">
        <el-form-item label="外链" prop="isFrame">
          <el-switch
            v-model="ruleForm.isFrame"
            :active-value="0"
            :inactive-value="1"
            active-text="是"
            inactive-text="否"></el-switch>
        </el-form-item>
        <el-form-item label="是否缓存" prop="isCache">
          <el-switch
            v-model="ruleForm.isCache"
            :active-value="0"
            :inactive-value="1"
            active-text="是"
            inactive-text="否"></el-switch>
        </el-form-item>
      </div>
      <div class="MenuForm-switch">
        <el-form-item label="菜单状态" prop="status">
          <el-switch
            v-model="ruleForm.status"
            :active-value="0"
            :inactive-value="1"
            active-text="启用"
            inactive-text="停用"></el-switch>
        </el-form-item>
        <el-form-item label="菜单显隐" prop="visible">
          <el-switch
            v-model="ruleForm.visible"
            :active-value="0"
            :inactive-value="1"
            active-text="显示"
            inactive-text="隐藏"></el-switch>
        </el-form-item>
      </div>
    </el-form>
    <div class="MenuForm-action">
      <el-button type="primary" @click="submitForm('ruleForm')">
        保存
      </el-button>
      <el-button @click="$emit('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
import { addMenu, getMenuInfo } from '@/api/menu'
export default {
  name: 'MenuForm',
  props: {
    menuTree: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      ruleForm: {
        menuName: '',
        orderNum: null,
        menuType: '',
        path: '',
        parentId: '0',
        component: '',
        query: '',
        icon: 'el-icon-menu',
        isFrame: 1,
        isCache: 0,
        status: 0,
        visible: 0,
      },
      defaultProps: {
        label: 'menuName',
        children: 'children',
        value: 'menuId',
        emitPath: false,
        checkStrictly: true,
      },
      parentType: '',
    }
  },
  computed: {
    rules() {
      const validatePath = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入路由地址'))
        } else {
          callback()
        }
      }
      const validateComponent = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入组件地址'))
        } else {
          callback()
        }
      }
      const rules = {
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur',
          },
        ],
        menuType: [
          { required: true, message: '请选择菜单类型', trigger: 'blur' },
        ],
        path: [{ required: true, validator: validatePath, trigger: 'blur' }],
      }
      if (this.ruleForm.menuType == 'C') {
        rules.component = [
          { required: true, validator: validateComponent, trigger: 'blur' },
        ]
      } else {
        delete rules.component
      }
      return rules
    },
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('close')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addMenu({ ...this.ruleForm }).then(() => {
            this.$emit('reload')
            this.$emit('close')
          })
        }
      })
    },
    addMenu(data, orderNum) {
      const parentId = data.menuId
      this.parentType = data.menuType
      this.initData()
      this.$nextTick(() => {
        this.$set(this.ruleForm, 'parentId', parentId)
        this.$set(this.ruleForm, 'orderNum', orderNum)
      })
    },
    editMenu(id) {
      this.initData()
      getMenuInfo(id).then((res) => {
        this.ruleForm = res.data
      })
    },
    initData() {
      this.ruleForm = {
        menuName: '',
        orderNum: null,
        menuType: '',
        path: '',
        parentId: '0',
        component: '',
        query: '',
        icon: 'el-icon-menu',
        isFrame: 1,
        isCache: 0,
        status: 0,
        visible: 0,
      }
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields()
      })
    },
  },
}
</script>
<style scoped lang="less">
.MenuForm {
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.MenuForm-switch {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  // justify-content: space-between;
}
.demo-ruleForm {
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: 1fr 1fr;
}
.MenuForm-action {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
/deep/.el-form-item__content {
  display: flex;
  align-items: center;
  height: 40px;
}
/deep/.el-input-number {
  .el-input__inner {
    text-align: left;
  }
}
</style>
