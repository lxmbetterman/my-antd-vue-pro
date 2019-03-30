import Vue from 'vue'
import router from './router/router'
import store from './store'
let whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (Vue.ls.get('token')) { // 如果有token表示在有效期内以及登录过了
    if (to.path === '/login') { // 如果有token且跳到登陆页，则调到path: '/'（会重定向到首页）
      next({ path: '/index' }) // 重定向的路由跳转过程中会经过beforeEach的逻辑重复这个过程
    } else { // 如果是跳转到其他页面
      // 首先判断有无 userInfo
      if (store.getters.roles.length === 0) { // 如果没有用户信息 则根据token获取userInfo并保存,
        store.dispatch('get_user_info', store.getters.token).then(res => {
          // next()
          const roles = res.roles
          store.dispatch('GenerateRoutes', roles).then((res) => {
            if (store.getters.addRouters) {
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            }
            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
            // next()
          })
          // next()
        }).catch(() => {
          next('/index')
        })
        // new Promise((resolve, reject) => {
        //   // 保存userInfo
        //   reject(a)
        // }).then(() => {
        //   next()
        // }).catch(() => {
        //   // 执行loginOut的操作
        //   localStorage.setItem('token', '')
        //   next({ path: '/' })
        // })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入(不设置'/login'就会进入死循环)
      next()
    } else { // 调到登陆页，
      if (to.path !== '/index/home') {
        next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      } else {
        next(`/login`)
      }
    }
  }
})
