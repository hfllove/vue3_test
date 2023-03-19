<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <button @click="changeInfo">修改个人信息</button>
  <hr>
  <h2>工作类型：{{ job.type }}</h2>
  <h2>工资：{{ job.salary }}</h2>
  <button @click="changeJob">修改工作信息</button>
</template>

<script>
// import {h} from 'vue'

import {ref} from 'vue'
export default {
  name: 'App',
  setup () {
    // 数据
    let name = ref('张三')
    let age = ref(18)
    let job = ref({
      type: '前端工程师',
      salary: '30k'
    })

    // 方法
    function changeInfo () {
      name.value = '李四'
      age.value = 20
    }

    function changeJob () {
      job.value.type = '高级工程师',
      job.value.salary = '40k'
    }

    // 返回一个对象(常用)
    return {
      name,
      age,
      changeInfo,
      changeJob,
      job
    }

    // 返回一个函数(渲染函数)
    // return ()=> h('h1','尚硅谷')
  }
}
</script>

