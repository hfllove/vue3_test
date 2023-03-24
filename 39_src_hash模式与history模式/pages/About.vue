<template>
    <h2>我是About的内容</h2>
</template>

<script>
export default {
    name: 'About',
    // beforeDestroy () {
    //     console.log('About组件即将被销毁了')
    // },
    // mounted () {
    //     console.log('About组件挂载完成',this),
    //     window.aboutRoute = this.$route,
    //     window.aboutRouter = this.$router
    // }
    mounted () {
        console.log('##',this.$route)
    },

    // 通过路由规则，进入该组件时被调用
    beforeRouteEnter (to,from,next) {
        console.log('About---beforeRouterEnter',to,from)
        if(to.meta.isAuth){ // 判断是否需要鉴权
        if(localStorage.getItem('school')==='atguigu'){
            // document.title = to.meta.title || '硅谷系统'
            next() 
            }else{
                alert('学校名错误，无权限查看！')
            } 
        }
        else{
            // document.title = to.meta.title || '硅谷系统'
            next()
        }
    },
    
    // 通过路由规则，离开该组件时被调用
    beforeRouteLeave (to,from,next) {
        console.log('About---beforeRouterLeave',to,from)
        next()
    }
}
</script>

