import vue from 'vue'

const state = {
  app_token: ''
}
const mutations = {
  SAVE_APP_TOKEN (state, token) {
    state.app_token = token
  }
}
const actions = {
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
    return new Promise(async (resolve, reject) => {
      await dispatch('remove_app_token') // 清除token
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
