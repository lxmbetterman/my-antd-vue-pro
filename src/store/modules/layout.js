// 布局相关的控制变量
const layout = {
  namespaced: true,
  state: {
    collapsed: false, // false 展开； true 折叠的
    menuPosition: 'side' // 菜单位置
  },
  mutations: {
    TOGGLE_COLLAPSED (state, val) {
      if (val === undefined) {
        state.collapsed = !state.collapsed
      } else {
        state.collapsed = val
      }
    },
    CHANGE_MENU_POSITION (state, position) {
      state.menuPosition = position
    }
  },
  actions: {
    toggle_collapsed ({ commit }, val) {
      commit('TOGGLE_COLLAPSED', val)
    }
  }
}
export default layout
