<template>
  <div>
      <h2>学生姓名：{{ name|mySlice }}</h2>
      <h2>学生性别：{{ sex }}</h2>
      <button @click="test">点我测试hello方法</button>
  </div>
</template>

<script>

export default {
    name:'Student',
    data(){
        return {
            name:'张三aaa',
            sex:'男'
        }
    },
    methods:{
        test(){
            this.hello()
        }
    }
}
</script>

<style>

</style>