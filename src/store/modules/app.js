import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    CLOSE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        state.sidebar.opened = 0
      }
    },
    OPEN_SIDEBAR: state => {
      if (!state.sidebar.opened) {
        state.sidebar.opened = 1
      }
    },
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }){
      commit('CLOSE_SIDEBAR')
    },
    openSideBar({ commit }){
      commit('OPEN_SIDEBAR')
    }
  }
}

export default app
