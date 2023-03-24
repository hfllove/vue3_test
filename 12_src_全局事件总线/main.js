// 该文件是整个项目的入口文件
// 引入Vue框架
import Vue from 'vue'

// 引入App组件
import App from './App.vue'

// 关闭生产提示
Vue.config.productionTip = false

// 创建一个Vuecomponent构造函数
// const Demo = Vue.extend({})

// 创建一个Vuecomponent构造函数的实例对象
// const d = new Demo()

// 让组件实例对象(vc)可以访问到Vue原型上的方法，属性   VueComponent.prototype._proto_ === Vue.prototype
// Vue.prototype.x = d

// 创建vm实例
// new Vue({
//     render: h => h(App),

    
// }).$mount('#app')

new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    }

    // 销毁App组件实例

    // mounted () {
    //     setTimeout(()=>{
    //         this.$destroy()
    //     },3000)
    // }  
})