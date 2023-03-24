<template>
  <div class="demo">
      <h1>{{ msg }}</h1>
      <h2>学生名称：{{ name }}</h2>
      <h2>性别：{{ sex }}</h2>
      <h2>学生年龄：{{ myAge+1 }}</h2>
      <button @click="updateAge">点击修改学生年龄</button>
  </div>
</template>

<script>
export default {
    name: 'Student',
    data(){
        return {
            msg: '我是尚硅谷的学生',
            myAge: this.age,
        }
    }, 
    methods: {
        updateAge(){
            this.myAge += 1
            console.log(this)
        }
    },
    // 只接收数据
    // props:['name','sex','age']

    // 接收数据并且限制类型
    // props: {
    //     name: String,
    //     sex: String,
    //     age: Number
    // }
    
    // 接收数据+限制类型+默认数值
    props: {
        name:{
            type: String, //类型
            require: true //必要性
        },
        sex: {
            type: String,
            require: true
        },
        age:{
            type: Number,
            default: 99 //默认值
        }
    }
}
</script>

<style>
    .demo {
        background-color: #dd8565;
    }
</style>