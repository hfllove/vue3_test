<template>
    <div>
        <Student name="李四" sex="女" ></Student>
    </div>
</template>

<script>
// 汇总所有组件
import Student from '../03_src_props配置/components/Student.vue'

    export default {
        name: 'App',
        // 注册
        components:{
            Student
        }
    }
</script>

<style>

</style>