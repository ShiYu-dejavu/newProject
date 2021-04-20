import {
  logout,
  getUserInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken,
  removeForm
} from '@/common/utils/auth'
import {
  Message
} from '../../../node_modules/element-ui';

//提取路由
const generator = (routes) => {
  return routes.map((item, i) => {
    const currentRouter = {
      path: item.path,
      component: () =>
        Promise.resolve(require(`@/views/${item.component}`).default),
      name: item.name,
      meta: item.meta,
      hidden: item.hidden,
      lastMenu: item.lastmenu
    }
    currentRouter.path = currentRouter.path.replace('//', '/')
    item.redirect && (currentRouter.redirect = item.redirect);
    //是否有子菜单，递归处理
    if (item.children && item.children.length > 0) {
      currentRouter.children = generator(item.children);
    }
    return currentRouter;
  })
}

const user = {
  state: {
    token: getToken(),
    routerMenu: [],
    information: '0',
    btnAuth: ""
  },

  mutations: {
    SET_AUTH: (state, menu) => {
      state.routerMenu = menu
    },
    SET_BTNAUTH: (state, btnAuth) => {
      state.btnAuth = btnAuth;
    }
  },
  actions: {

    //获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo({
          projectName: "report"
        }).then(response => {
          const route = response.data.data.data;
          commit("SET_BTNAUTH", response.data.data.roles.btnauth);
          const routers = generator(route);
          console.log('routers', routers)
          commit('SET_AUTH', routers)
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        removeToken()
        resolve()
        removeForm()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        removeToken()
        resolve()
      })
    }
  }
}

export default user