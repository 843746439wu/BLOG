<template>
  <div>
    <el-row class="form_main">
      <el-col :span="9" :offset="7">
        <el-card class="box-card">
          <h1>登录</h1>
          <div class="card_main">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px">
              <el-form-item label="用户名" prop="userno">
                <el-input v-model="form.userno"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login('form')">登录</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
                <el-button type="text" @click="register">前往注册</el-button>
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
  name: 'Login',
  data () {
    return {
      form: {
        userno: '',
        password: ''
      },
      rules: {
        userno: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {

    register () {
      this.$router.push('/register')
    },
    login (form) {
      const self = this
      this.axios.post('http://localhost:8088/user/login/', {
        userno: this.form.userno,
        password: this.form.password
      }).then(function (response) {
        console.log(response)
        // eslint-disable-next-line eqeqeq
        if (response.status == 200) {
          sessionStorage.setItem(
            'users', JSON.stringify({
              userno: self.form.userno
            })
          )
          self.$router.push('/blogsall')
        }
      }).catch(function (e) {
        alert(e)
      })
    },
    resetForm (form) {
      this.$refs[form].resetFields()
    }

  }
}
</script>

<style scoped>

</style>
