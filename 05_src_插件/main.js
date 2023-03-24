// 该文件是整个项目的入口文件
// 引入Vue框架
import Vue from 'vue'

// 引入App组件
import App from './App.vue'

// 引入plugins插件
import plugins from './plugins'

// 关闭生产提示
Vue.config.productionTip = false

// 应用(使用)插件
Vue.use(plugins)

// 创建vm实例
new Vue({
    render: h => h(App),
    
}).$mount('#app')