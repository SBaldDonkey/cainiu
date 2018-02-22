// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from '@/util/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import FastClick from 'fastclick'
import {getCookie, setCookie, delCookie} from '@/util/cookie'
import {post, fetch, patch, put} from '@/util/http'

// 解决click点击300毫秒延时问题
FastClick.attach(document.body)
Vue.config.productionTip = false

Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put

// cookie方法
Vue.prototype.getCookie = getCookie
Vue.prototype.setCookie = setCookie
Vue.prototype.delCookie = delCookie

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
