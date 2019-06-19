// import Vue from 'vue'
// import Vuex from 'vuex'
// import getters from './getters'
// import app from './modules/app'
// import permission from './modules/permission'
// import userInfo from './modules/userInfo'
// import layout from './modules/layout'
// import tagsView from './modules/tagsView'
// import constVar from './modules/const.js'

// Vue.use(Vuex)
// export default new Vuex.Store({
//   modules: {
//     app,
//     permission, // 关于权限路由数据的store
//     userInfo, // 用户信息相关数据
//     layout, // 布局相关数据
//     tagsView, // tag/页面缓存 相关数
//     constVar
//   },
//   getters
// })

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
