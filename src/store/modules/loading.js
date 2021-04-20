const menu = {
  state: {
    isShow: false
  },
  getters: {
    isShowMethod(state) {  
      return state.isShow;  
    }
  },
  mutations: {
    showload(state) {
      state.isShow = true;
    },
    hideload(state) {
      state.isShow = false;
    }
  },
  actions: {
    showLoading({
      commit
    }) {  
      commit('showload')  
    },
      hideLoading({
      commit
    }) {  
      commit('hideload')  
    }
  }
}

export default menu