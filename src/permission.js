import Vue from 'vue'
import router from './router/router'
import store from './store'
let whiteList = ['/login']
// router.beforeEach((to, from, next) => {
//   if (Vue.ls.get('token')) { // 如果有token表示在有效期内以及登录过了
//     if (to.path === '/login') { // 如果有token且跳到登陆页，则调到path: '/'（会重定向到首页）
//       next({ path: '/index' }) // 重定向的路由跳转过程中会经过beforeEach的逻辑重复这个过程
//     } else { // 如果是跳转到其他页面
//       // 首先判断有无 userInfoget_user_info
//       if (store.getters.roles.length === 0) { // 如果没有用户信息 则根据token获取userInfo并保存,
//         store.dispatch('get_user_info', store.getters.token).then(res => {
//           // next()
//           const roles = res.roles
//           store.dispatch('GenerateRoutes', roles).then((res) => {
//             if (store.getters.addRouters) {
//               router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//             }
//             // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//             next({ ...to, replace: true })
//             // next()
//           })
//           // next()
//         }).catch(() => {
//           next('/index')
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入(不设置'/login'就会进入死循环)
//       next()
//     } else { // 调到登陆页，
//       if (to.path !== '/index/home') {
//         next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//       } else {
//         next(`/login`)
//       }
//     }
//   }
// })
router.beforeEach(async (to, from, next) => {
  // start progress bar

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  if (Vue.ls.get('token')) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/index' })
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('userInfo/get_user_info')
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/GenerateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          // NProgress.done()
        }
      }
    }
  } else {
    /* has no token */

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      // NProgress.done()
    }
  }
})
