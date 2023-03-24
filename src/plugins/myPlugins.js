// 自定义插件
// install方法默认接收一个形参-Vue
let myPlugins = {}
myPlugins.install = function (Vue,options){
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase()
    })
}
export default myPlugins