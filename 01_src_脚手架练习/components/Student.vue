<template>
<!-- 组件的结构 -->
    <div>
        <h2>学生姓名：{{ name }}</h2>
        <h2>学生年龄：{{ age }}</h2>
    </div>
</template>

<script>
// 组件交互相关的代码(数据、方法等)
// 暴露有三种：默认暴露 、统一暴露(开头位置export {})、 分别暴露(结尾位置export {})
    export default {
        name: 'Student',
        data(){
            return {
                name: '张三',
                age: 18
            }
        },

    }
</script>

<style>
    /* 组件的样式 */
</style>