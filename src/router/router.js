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
      title: 'home + about',
      icon: 'gift'
    },
    children: [{
      path: '/index/home',
      component: Home,
      name: 'home',
      meta: {
        title: 'home',
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
    path: '/form',
    component: Layout,
    name: 'form',
    redirect: '/form/basic_form2',
    meta: {
      title: '页面模板配置管理',
      icon: 'question',
      roles: []
    },
    children: [ {
      path: '/form/basic_form2',
      component: () => import('../views/form/form2.vue'),
      name: 'basic_form2',
      meta: {
        title: '车型详情',
        icon: 'question',
        roles: ['admin']
      } // 'admin',
    }]
  },
  {
    path: '/resourceManage',
    component: Layout,
    name: 'resourceManage',
    redirect: '/resourceManage/imageManage',
    meta: {
      title: '资源上传管理',
      icon: 'question',
      roles: []
    },
    children: [{
      path: '/resourceManage/imageManage',
      component: () => import('../views/resourceManage/imageManage.vue'),
      name: 'imageManage',
      meta: {
        title: '图片管理',
        icon: 'question',
        roles: ['admin']
      } // 'admin',
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
