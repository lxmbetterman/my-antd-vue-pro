import Vue from 'vue'
import 'babel-polyfill'
import App from './views/App'
import router from './router/router'
import store from './store/index'
import './antd-import.js'
// import {
//   Button,
//   Layout,
//   Menu, Icon, Row, Col, Drawer, BackTop, Tabs, Dropdown, Avatar, Form
// } from 'ant-design-vue'
import './permission'
import Storage from 'vue-ls'
import { VueAxios } from './axios/request' // 整体使用就行
// import './mock' // 引入mockjs
import './common.css'
import 'normalize.css'

// Vue.use(Button)
// Vue.use(Layout)
// Vue.use(Menu)
// Vue.use(Icon)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Drawer)
// Vue.use(BackTop)
// Vue.use(Tabs)
// Vue.use(Dropdown)
// Vue.use(Avatar)
// Vue.use(Form)

Vue.use(Storage, {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
})
Vue.use(VueAxios, router)
Vue.config.productionTip = false

new Vue({
  router: router,
  store,
  render: h => h(App),
  mounted () {
    store.commit('app/SAVE_APP_TOKEN', Vue.ls.get('token')) // 每次刷新把localStorage的token保存一份到store
  }
}).$mount('#app')
Vue.ls.get('token')
