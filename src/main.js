// import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 注册三级联动菜单全局组件
import CategorySelector from '@/components/CategorySelector'

Vue.component(CategorySelector.name,CategorySelector)

// ###1 注册封装title提示按钮全局组件
// HitnButton 这个是HitnButton组件这个对象
import HitnButton from '@/components/HitnButton'
// console.log(HitnButton)
Vue.component(HitnButton.name,HitnButton)

Vue.config.productionTip = false

// 引入API请求
import API from '@/api'
// 将请求API挂载到Vue.prototype原型上，以便所有的组件可以直接使用
Vue.prototype.$API = API

new Vue({
  el: '#app',
  // async mounted () {
  //   await store.dispatch('user/getInfo').then(accessRoutes=>{
  //     console.log(accessRoutes)
  //   })
  //   // console.log(result)
  // },
  // created () {
  //   store.dispatch('computedAsyncRoutes').then(accessRoutes=>{
  //     router.addRoutes(accessRoutes)
  //     next({...to,replace:true})
  //   })
    
  // },
  router,
  store,
  render: h => h(App)
})
