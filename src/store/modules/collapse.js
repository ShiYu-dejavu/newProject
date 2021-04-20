const collapse = {
  state: {
    collapse: false,
  },
  getters: {
    isCollapse(state) {  
      return state.collapse;  
    },
  },
  mutations: {
    collapseShow(state) {
      state.collapse = true;
    },
    collapseHide(state) {
      state.collapse = false;
    },
  },
  actions: {
    collapseShow({
      commit
    }) {  
      commit('collapseShow')  
    },
    collapseHide({
      commit
    }) {  
      commit('collapseHide')  
    }
  }
}

export default collapse