import vue from 'vue'

const app = {
  state: {
    app_token: ''
  },
  mutations: {
    SAVE_APP_TOKEN (state, token) {
      state.app_token = token
    }
  },
  actions: {
    save_app_token ({ commit }, token) { // localStorage and store 都保存
      commit('SAVE_APP_TOKEN', token)
      vue.ls.set('token', token)
    },
    remove_app_token ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SAVE_APP_TOKEN', '')
        vue.ls.remove('token')
        resolve()
      })
    },
    app_login ({ dispatch, commit }) { // 应用登录
      return new Promise((resolve, reject) => {
        // vue.axios.post('/login/token').then((res) => { // 获取token并保存跳转到首页
        //   dispatch('save_app_token', res) // dispatch是异步执行的
        //   resolve()
        // })
        dispatch('save_app_token', '9527') // dispatch是异步执行的
        resolve()
      })
    },
    app_logout ({ dispatch }) { // 应用退出登录
      return new Promise((resolve, reject) => {
        dispatch('remove_app_token') // 清除token
        dispatch('clear_user_info') // 清除用户信息数据
        dispatch('clear_routes') // 清除路由数据
        resolve()
      })
    }
  }
}
export default app
