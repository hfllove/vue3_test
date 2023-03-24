<template>
<div id="root">
    <button @click="isShow=!isShow">显示/隐藏</button>
    <!-- appear 即改为一开始执行动画一次 -->
    <transition name="hello" appear>
        <h1 v-show="isShow">你好啊</h1> 
    </transition>
</div> 
</template>

<script>
export default {
    name:'Test',
    data () {
        return {
            isShow: true
        }
    }
}
</script>

<style scoped>
    h1 {
        background-color: #ff4500;    
    }
    .hello-enter-active{
        animation: action 1s ;
    }
    .hello-leave-active{
        animation: action 1s reverse;
    }
    @keyframes action {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0)
        }
    }
</style>