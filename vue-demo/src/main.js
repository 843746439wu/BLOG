// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAxios from 'vue-axios'

import axios from 'axios'
Vue.prototype.$axios = axios

import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
Vue.use(mavonEditor)

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
