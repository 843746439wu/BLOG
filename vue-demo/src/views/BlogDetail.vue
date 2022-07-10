<template>
  <div>
    <div class="mblog">
      <h2> {{ blog.title }}</h2>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>

    </div>
  </div>
</template>

<script>
import 'github-markdown-css'

export default {
  name: 'BlogDetail',
  data() {
    return {
      blog: {
        id: '',
        title: '',
        content: ''
      },
    }
  },
  created() {
    const blogId = this.$route.params.blogId
    const _this = this
      this.$axios.post('http://localhost:8088/blog/blogs/detail',null,{
          params:{
            id: blogId
          }
        }
      ).then(res => {
        console.log(res.data)
        const blog = res.data
        _this.blog.id = blog.id
        _this.blog.title = blog.title

        var MardownIt = require('markdown-it')
        var md = new MardownIt()

        var result = md.render(blog.content)
        _this.blog.content = result
      })

  }
}
</script>

<style scoped>
.mblog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 700px;
  padding: 20px 15px;
}
</style>
