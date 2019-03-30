import { axios } from '../../axios/request'
const app = {
  state: {
    roles: [] // 用于保存用户当前的角色（没有roles数据，路由跳转时，会根据保存的token请求用户数据）
  },
  mutations: {
    SAVE_ROLES (state, roles) {
      state.roles = roles
    },
    CLEAR_USER_INFO (state) {
      state.roles = []
    }
  },
  actions: {
    save_roles ({ commit }, roles) {
      commit('SAVE_ROLES', roles)
    },
    get_user_info ({ dispatch, commit }, token) {
      return new Promise((resolve, reject) => {
        axios.get('/login/userInfo', {
          params: { token }
        }).then((res) => {
          commit('SAVE_ROLES', res.roles)
          resolve(res)
        })
      })
    },
    clear_user_info ({ commit }) {
      commit('CLEAR_USER_INFO')
    }
  }
}
export default app
