<template>
  <div>
    <div class="head">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1"><el-link href="/#/blogsall" >首页</el-link></el-menu-item>
        <el-menu-item index="1"><el-link href="/#/blogs" >个人博客</el-link></el-menu-item>
        <el-menu-item index="2"><el-link href="/#/blogs/blogsedit" >发表博客</el-link></el-menu-item>
        <el-menu-item index="3"><el-link href="/" >退出</el-link></el-menu-item>
      </el-menu>
    </div>
    <div class="contain">
      <h1>欢迎来到个人博客系统</h1>
      <div class="demo-image">
        <el-image style="width: 100px; height: 100px" :src="url"></el-image>
      </div>
      <div>{{username}}</div>
      <div class="block">
        <el-timeline v-for="blog in blogs">
          <el-timeline-item :timestamp="blog.created" placement="top">
            <el-card>
              <h4>
                <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                  {{blog.title}}
                </router-link>
              </h4>
              <p>{{blog.description}}</p>
              <div>
                <router-link :to="{name: 'BlogsEdit', params: {blogId: blog.id}}"><i class="el-icon-edit">编辑</i></router-link>
                <router-link :to="{name: 'BlogsEdit', params: {blogId: blog.id}}" type="danger" ><i class="el-icon-delete">删除</i></router-link>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div>
        <el-pagination
                       background
                       layout="total,sizes,prev, pager, next,jumper"
                       :current-page="this.params.page"
                       :page-sizes="[1,2,3,4]"
                       :page-size="this.params.size"
                       :total="this.pages"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Blogs',
  data () {
    return {
      username: '',
      user_id: '',
      blogs: {},
      total: 0,
      pages: 0,
      params: {
        page:1,
        size:5,
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  http: {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  },
  created () {
    let _this = this
    let users = JSON.parse(sessionStorage.getItem('users'))
    if (users) {
      axios.post('http://localhost:8088/user/blogs/', null, {
        params: {
          userno: users.userno
        }
      }
      ).then(function (response) {
        console.log(response)
        _this.username = response.data.username
      })
    }
    this.getInvitationList();
  },
  methods: {
    deleteId(id){
      const blogId = this.$route.params.blogId
      console.log(blogId)
      axios.post('http://localhost:8088/blog/deleteId', null, {
        params: {
          id: blogId,
        }
      }).then(function (response) {
        console.log(response.data)
      })

    },
    handleSizeChange(val){
      this.params.size = val;
      this.getInvitationList();
    },
    handleCurrentChange(val){
      this.params.page = val;
      this.getInvitationList();
    },
    getInvitationList(){
      let _this = this
      let users = JSON.parse(sessionStorage.getItem('users'))
      axios.post('http://localhost:8088/blog/blogs', null, {
          params: {
            user_id: users.userno,
            pageNum: this.params.page,
            pageSize: this.params.size
          }
      }).then(function (response) {
        console.log(response.data)
        _this.blogs = response.data.list
        _this.total = response.data.total
        _this.pages = response.data.pages
      })
    }
  }
}

</script>

<style scoped>
  .block{
    text-align: left;
    width: 1500px;
    margin: 20px 100px;
  }
</style>
