const getters = {
  //  modules/app.js
  token: state => state.app.app_token,

  //  modules/userInfo.js
  roles: state => state.userInfo.roles,

  // modues/permission.js
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers, // 所有的路由数据

  // modules/layout
  collapsed: state => state.layout.collapsed,
  menuPosition: state => state.layout.menuPosition
}
export default getters
