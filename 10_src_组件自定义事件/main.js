// 该文件是整个项目的入口文件
// 引入Vue框架
import Vue from 'vue'

// 引入App组件
import App from './App.vue'

// 关闭生产提示
Vue.config.productionTip = false

// 创建vm实例
// new Vue({
//     render: h => h(App),

    
// }).$mount('#app')

new Vue({
    el: '#app',
    render: h => h(App),

    // 销毁App组件实例

    // mounted () {
    //     setTimeout(()=>{
    //         this.$destroy()
    //     },3000)
    // }  
})