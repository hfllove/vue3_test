// 默认暴露
export default {
    install(Vue){
        // 全局的过滤器
        Vue.filter('mySlice',function(value){
            return value.slice(0,4)
        })

        // 全局定义
        Vue.directive('fbind',{
            // 指令与元素成功绑定时
            bind(element,binding){
                // console.log('fbind-bind',this)  //this 的指向是window 因为指令是为了操作DOM元素
                element.value = binding.value
            },
            // 指令所在元素插入页面后
            inserted(element,binding){
                element.focus()
            },
            // 指令所在模板被重新解析时
            update(element,binding){ 
                element.value = binding.value
            }
        })

        // 定义混入
        Vue.mixin({
            data(){
                return {
                    x:100,
                    y:200
                }
            },
            mouted(){
                console.log('dddd')
            }
        })

        // 给Vue的原型上添加一个方法，(vm和vc就都能用了)
        Vue.prototype.hello = () =>{alert('你好啊！')}
    }
}