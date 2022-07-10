import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import Blogs from '../views/Blogs'
import BlogsAll from '../views/BlogsAll'
import BlogsEdit from '../views/BlogsEdit'
import BlogDetail from '../views/BlogDetail'
import BlogsEdits from '../views/BlogsEdits'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs
    },
    {
      path: '/blogsall',
      name: 'BlogsAll',
      component: BlogsAll
    },
    {
      path: '/blogs/blogsedit',
      name: 'BlogsAdd',
      component: BlogsEdit
    },
    {
      path: '/blog/:blogId',
      name: 'BlogDetail',
      component: BlogDetail
    },
    {
      path: '/blog/:blogId/edit',
      name: 'BlogsEdit',
      component: BlogsEdits
    }
  ]
})
