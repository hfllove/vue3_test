// 配置路由的地方
// 引入配置路由文件
import routes from './routes.js'
// 引入Vue
import Vue from 'vue'
// 引入仓库store
import store from '@/store/index.js'
// 引入VueRouter插件
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

// 备份VueRouter原型对象的push
let originPush = VueRouter.prototype.push
// 备份VueRouter原型对象的replace
let originReplace = VueRouter.prototype.replace

// 重写push方法
VueRouter.prototype.push = function (location,resolve,reject) {
    if(resolve&reject) {
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
// 重写replace方法
VueRouter.prototype.replace = function (location,resolve,reject) {
    if(resolve&reject) {
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}


// 暴露一个VueRouter对象
let router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior (to, from, savePosition) {
        return {y:0}
    }
})
// 导航守卫： 全局前置守卫（在路由进行跳转之前进行判断）
router.beforeEach(async(to,from,next)=>{
    // to 即将要跳转的路由
    // from 可以获取从哪个路由来的信息
    // next 放行函数 next()全部放行，next(path)放行到指定路由， next(false)终止放行，原路返回，跳转到from路由对应的地址
    // 获取用户的token
    let token = store.state.register.token
    // 获取用户名name
    let name = store.state.register.userInfo.name

    // 如果已经登录
    if(token){
        // 不能跳到登录页
        if(to.path == '/login'|| to.path == '/register') {
            next('/')
            console.log("已经登录，不能跳到【注册/登录】页！")
        }else{
            if(name){
                // 正常放行
                console.log("正常放行")
                next()
            }else{
                try {
                    // 页面重载，刷新vuex时，获取用户信息展示
                    await store.dispatch('getUserInfo')
                    // 放行
                    next()
                    console.log("刷新vuex")
                } catch (error) {
                    // token令牌失效
                    console.log("token令牌失效")
                    await store.dispatch('userLogOut')
                    next('/login')
                }
                
            }
        }
    }else{
      let toPath = to.path
      if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 ||toPath.indexOf('/center')!=-1){
          next('/login?redirect='+toPath)
          console.log("没有登录")  
      }else{
        next()  
      }
      
    }
    
})
export default router