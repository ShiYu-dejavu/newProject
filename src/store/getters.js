const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  set_btnAuth: state => state.user.btnAuth,
  addRouters: state => state.permission.addRouters,
}
export default getters