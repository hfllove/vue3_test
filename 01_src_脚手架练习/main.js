// 该文件是整个项目的入口文件

// 引入 Vue框架
import Vue from 'vue'
// 引入 App组件。它是所有组件的汇总
import App from './App.vue'

// 关闭生产提示
Vue.config.productionTip = false

/*
  关于不同版本的Vue:
    1.vue.js与vue.runtime.xxx.js的区别：
      (1) vue.js是完整版的Vue.包含：核心功能+模板解析器。
      (2) vue.runtime.xxx.js是运行版的Vue.只包含：核心功能。没有模板解析器
    
    2.因为Vue.runtime.xxx.js没有模板解析器，所有不能使用template配置项，需要使用render函数接收
      到的createElement函数去指定具体内容
*/


// 创建vm实例
new Vue({
  render: h => h(App),
  /*  
    render(createElemnt){
      return createElement('h1','你好，欢迎来到尚硅谷')
    }
  */
  
}).$mount('#app')
