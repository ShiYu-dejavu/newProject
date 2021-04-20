import {
  constantRouterMap
} from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({
      state,
      commit,
      rootState
    }) {
      let menu = rootState.user.routerMenu
      return new Promise(resolve => {
        commit('SET_ROUTERS', menu)
        resolve()
      })
    }
  }
}

export default permission