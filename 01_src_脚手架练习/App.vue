<template>
    
    <div>
        <h1>01_src_脚手架练习</h1>
        <School></School>
        <Student></Student>
    </div>
</template>

<script>
    // 引入组件
    import School from './components/School'
    import Student from './components/Student'
    export default {
        name: 'App',
        // 注册
        components:{
            School,
            Student
        }
    }
</script>

<style>

</style>