<template>
    <div class="app">
        <h1>{{ msg }}</h1>
        <School/>
        <Student/>
    </div>
</template>

<script>
// 汇总所有组件
import School from './components/School.vue'
import Student from './components/Student.vue'

    export default {
        name: 'App',
        data () {
            return {
                msg: '你好啊',
            }
        },
        // 注册
        components:{
            Student,
            School
        },
    }
</script>

<style>
    .app {
        background-color: gray;
        padding: 5px;
    }
</style>