// 布局相关的控制变量
const layout = {
  state: {
    collapsed: false // false 展开； true 折叠的
  },
  mutations: {
    TOGGLE_COLLAPSED (state) {
      state.collapsed = !state.collapsed
    }
  },
  actions: {
    toggle_collapsed ({ commit }) {
      commit('TOGGLE_COLLAPSED')
    }
  }
}
export default layout
