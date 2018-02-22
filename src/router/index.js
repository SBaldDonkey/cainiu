import Vue from 'vue'
import Router from 'vue-router'
import store from '@/util/store'
import * as types from '@/util/types'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: resolve => require(['@/views/public/login'], resolve)
  },
  {
    path: '/index',
    name: '借款明细',
    component: resolve => require(['@/views/index/index'], resolve),
    iconCls: 'iconfont icon-commodit',
    menuShow: true,
    meta:{requireAuth: true},
    children: [
      {
        path: '/list',
        name: '借款管理',
        component: resolve => require(['@/views/pageList/pageList'], resolve),
        menuShow: true,
        meta:{requireAuth: true}
      }
    ]
  }
]

if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token')); // 得到token时需要存在本地
}

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach获取当前的token是否存在  '+store.state.token)
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router
