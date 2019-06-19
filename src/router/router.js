import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../components/layout/layout-index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('../views/login/index'),
    hidden: true
  },
  {
    path: '',
    redirect: '/index/home', // 当路由为 '' 会重定向到 首页
    hidden: true
  },
  {
    path: '/index', // 把首页作为 path == ''是符合路由逻辑的
    component: Layout,
    redirect: '/index/home', // 当路由为 '' 会重定向到 home
    meta: {
      title: '首页',
      icon: 'gift'
    },
    children: [{
      path: '/index/home',
      component: Home,
      name: 'home',
      meta: {
        title: '首页面板',
        icon: 'setting'
      }
    }
    ]
  }
]

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/test1',
    component: Layout,
    name: 'test1',
    redirect: '/test1/test1-1',
    meta: {
      title: 'test测试页面1',
      icon: 'question'
    },
    children: [{
      path: '/test1/test1-1',
      component: () => import('../views/test_1/test_1_1.vue'),
      name: 'test_1_1',
      meta: {
        title: '回到顶部',
        icon: 'question'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
