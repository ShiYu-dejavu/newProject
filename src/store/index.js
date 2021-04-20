import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import tagsView from './modules/tagsView'
import collapse from './modules/collapse'
import menu from './modules/loading'
import permission from './modules/permission'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    menu,
    tagsView,
    collapse,
    permission,
    user
  },
  getters
})

export default store