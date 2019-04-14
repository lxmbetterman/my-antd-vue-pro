import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import userInfo from './modules/userInfo'
import layout from './modules/layout'
import tagsView from './modules/tagsView'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    permission, // 关于权限路由数据的store
    userInfo, // 用户信息相关数据
    layout, // 布局相关数据
    tagsView // tag/页面缓存 相关数
  },
  getters
})
