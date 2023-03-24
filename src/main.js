// 该文件是整个项目的入口文件
// 引入Vue框架
import Vue from 'vue'

// 引入App组件
import App from './App.vue'

// 引入Element插件
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 按需引入
import { Button,Row,DatePicker } from 'element-ui'


// 关闭生产提示
Vue.config.productionTip = false

// 使用Element插件
// Vue.use(ElementUI)
Vue.component('atguigu',Button)
Vue.component('atguigu-row',Row)
Vue.component('atguigu-date-picker',DatePicker)

// 创建vm实例
new Vue({
    el:'#app',
    render: h => h(App),
})