<template>
  <div>
    <el-row class="form_main">
      <el-col :span="9" :offset="7">
        <el-card class="box-card">
          <h1>注册</h1>
          <div class="card_main">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
              <el-form-item label="请输入帐号" prop="userno">
                <el-input v-model="form.userno" placeholder="手机号注册"></el-input>
              </el-form-item>
              <el-form-item label="请输入密码" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="请输入昵称" prop="username">
                <el-input v-model="form.username" placeholder="请输入昵称"></el-input>
              </el-form-item>
              <el-form-item label="请输入邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="register('form')">注册</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
                <el-button type="text" @click="gologin">已有账号,前往登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data () {
    var contactPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    var contactEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        // eslint-disable-next-line no-useless-escape
        const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的邮箱'))
        }
      }
    }
    return {
      form: {
        userno: '',
        password: '',
        username: '',
        email: ''
      },
      rules: {
        userno: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {validator: contactPhone, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在6到15个字符之间', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在6到10个字符之间', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: contactEmail, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    register: function (form) {
      this.axios.post('http://localhost:8088/user/register', {
        userno: this.form.userno,
        password: this.form.password,
        username: this.form.username,
        email: this.form.email
      }).then((response) => {
        console.log(response)
        console.log(response.data)
        if (response.data === '注册成功') {
          this.$message({
            message: '恭喜你，注册成功',
            type: 'success'
          })
        } else {
          this.$message.error('注册失败')
        }
      }).catch(function (error) {
        console.log(error)
      })
      // this.$router.push({path:'/registry'});
    },
    gologin () {
      this.$router.push('/')
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
