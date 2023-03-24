<template>
    <div>
        <Student/>
        <hr>
        <School/>
    </div>
</template>

<script>
// 汇总所有组件
import School from '../src/components/School.vue'
import Student from '../src/components/Student.vue'

    export default {
        name: 'App',
        // 注册
        components:{
            Student,
            School
        } 
    }
</script>

<style>
 
</style>