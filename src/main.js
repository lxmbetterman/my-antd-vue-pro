import Vue from 'vue'
import App from './views/App'
import router from './router/router'
import store from './store/index'
import {
  Button,
  Layout,
  Menu, Icon
} from 'ant-design-vue'
import './permission'
import Storage from 'vue-ls'
import { VueAxios } from './axios/request' // 整体使用就行
import './mock' // 引入mockjs
import './common.css'
import 'normalize.css'
Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
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
  render: h => h(App)
}).$mount('#app')
