<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>性别：{{ sex }}</h2>
  <button @click="sayHello">说话(Vue3所配置的——sayHello)</button>
  <br><br>
  <button @click="sayWelcome">说话(Vue2所配置的——sayWelcome)</button>
  <br><br>
  <button @click="test1">测试(在Vue2中读取Vue3里的配置)</button>
  <br><br>
  <button @click="test2">测试(在Vue3中读取Vue2里的配置)</button>
  <br><br>
  <h2>a的值是：{{ a }}</h2>
</template>

<script>
// import {h} from 'vue'
export default {
  name: 'App',
  data () {
    return {
      sex: '男',
      a:100
    }
  },
  methods: {
    sayWelcome () {
      alert('欢迎来到尚硅谷学习！')
    },
    test1 () {
      console.log(this.name)
      console.log(this.sex)
      console.log(this.age)
      console.log(this.sayHello)
    }
  },
  setup () {
    // 数据
    let name = '张三'
    let age = 18
    let a = 300

    // 方法
    function sayHello () {
      alert(`你好，我叫${name},我今年${age}了`)
    }

    function test2 () {
      console.log(name)
      console.log(age)
      console.log(sayHello)
      console.log(this.sex)
      console.log(this.sayWelcome)
    }

    // 返回一个对象(常用)
    return {
      name,
      age,
      sayHello,
      test2,
      a
    }

    // 返回一个函数(渲染函数)
    // return ()=> h('h1','尚硅谷')
  }
}
</script>

