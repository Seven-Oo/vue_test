// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import store from './store/index.js'
import Vuex from 'vuex'
import 'babel-polyfill'
import 'url-search-params-polyfill'

// import mock from './mock/mock' // mock.js文件
import axios from 'axios' // axios http请求库

axios.defaults.baseURL = process.env.BASE_API // 设置默认请求的url

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
