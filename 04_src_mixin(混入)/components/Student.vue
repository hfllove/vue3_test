<template>
  <div>
      <h2>学生姓名：{{ name }}</h2>
      <h2>学生性别：{{ sex }}</h2>
  </div>
</template>

<script>
// 引入一个局部混合配置项
// import {hunhe} from '../mixin'

export default {
    name:'Student',
    data(){
        return {
            name:'张三',
            sex:'男'
        }
    },
    // mixins:[hunhe]
}
</script>

<style>

</style>