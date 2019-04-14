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
    }, {
      path: '/index/about',
      name: 'about',
      meta: {
        title: 'about',
        icon: 'question'
      },
      component: () => import('../views/About.vue')
    }]
  }
]

export default new Router({
  mode: 'history',
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
        title: '测试页面1-1',
        icon: 'question'
      }
    }]
  },
  {
    path: '/test2',
    component: Layout,
    name: 'test2',
    redirect: '/test2/test2-1',
    meta: {
      title: 'test测试页面2',
      icon: 'question',
      roles: []
    },
    children: [{
      path: '/test2/test2-1',
      component: () => import('../views/test_2/test_2_1.vue'),
      name: 'test_2_1',
      meta: {
        title: '测试页面2-1',
        icon: 'question',
        roles: ['editor']
      } // 'admin',
    }
    ]
  },
  {
    path: '/editor',
    component: Layout,
    name: 'editor',
    redirect: '/editor/markdown',
    meta: {
      title: '编辑器',
      icon: 'question',
      roles: []
    },
    children: [{
      path: '/editor/markdown',
      component: () => import('../views/editor/markdown.vue'),
      name: 'markdown',
      meta: {
        title: 'mardown编辑器',
        icon: 'question',
        roles: ['admin']
      } // 'admin',
    }, {
      path: '/editor/tinymce',
      component: () => import('../views/editor/tinymcePage.vue'),
      name: 'tinymce',
      meta: {
        title: '富文本编辑器',
        icon: 'question',
        roles: ['admin']
      } // 'admin',
    }]
  },
  {
    path: '/form',
    component: Layout,
    name: 'form',
    redirect: '/form/basic_form',
    meta: {
      title: '表单集合',
      icon: 'question',
      roles: []
    },
    children: [{
      path: '/form/basic_form',
      component: () => import('../views/form/basic_form.vue'),
      name: 'basic_form',
      meta: {
        title: '基础表单的实现',
        icon: 'question',
        roles: ['admin']
      } // 'admin',
    }, {
      path: '/form/basic_form2',
      component: () => import('../views/form/form2.vue'),
      name: 'basic_form2',
      meta: {
        title: '基础表单的实现2',
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
