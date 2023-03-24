// import Vue from 'vue'
// import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 引入home仓库
import home from './modules/home'

// Vue.use(Vuex)

const store = new Vuex.Store({
  // 统一配置
  modules: {
    app,
    settings,
    user,
    home
  },
  getters
})

export default store
