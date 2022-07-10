<template>
  <div>
    <div class="head">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1"><el-link href="/#/blogs" >首页</el-link></el-menu-item>
        <el-menu-item index="2"><el-link href="/#/blogs/blogsedit" >发表博客</el-link></el-menu-item>
        <el-menu-item index="3"><el-link href="/" >退出</el-link></el-menu-item>
      </el-menu>
    </div>

    <div class="m-content">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"></mavon-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>

export default {
  name: 'BlogsEdit',
  data () {
    return {
      ruleForm: {
        id: '',
        title: '',
        description: '',
        content: '',
        created: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        content: [
          { trequired: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let users = JSON.parse(sessionStorage.getItem('users'))
      this.$refs[formName].validate((valid) => {
        this.ruleForm.id = users.userno
        if (valid) {
          this.$axios.post('http://localhost:8088/blog/addblog', this.ruleForm, {
            params: {
              user_id: this.ruleForm.id
            }
          }).then(res => {
            console.log(res)
            this.$router.push('/blogs')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
}
</script>

<style scoped>
.m-content {
  text-align: center;
  margin: 50px 60px;
  width: 90%;
}
</style>
