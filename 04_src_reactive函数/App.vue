<template>
  <h1>一个人的信息</h1>
  <!-- <h2>姓名：{{ person.name }}</h2>
  <h2>年龄：{{ age }}</h2> -->
  <h1>工作类型：{{ person.type }}</h1>
  <h1>工资：{{ person.salary }}</h1>
  <h1>兴趣：{{ hoppy }}</h1>
  <button @click="changeInfo">修改个人信息</button>
</template>

<script>
// import {h} from 'vue'

import {reactive, ref} from 'vue'
export default {
  name: 'App',
  setup () {
    // 数据
    // let name = ref('张三')
    // let age = ref(18)
    let person = reactive({
      type: '前端工程师',
      salary: '30k',
      a:{
        b:{
          c:666
        }
      }
    })

    let hoppy = reactive(['抽烟','喝酒','烫头'])

    // 方法
    function changeInfo () {
      person.type = '后端工程师',
      person.salary = '40k',
      person.a.b.c = 233
      hoppy[0] = '学习'
    }

    // 返回一个对象(常用)
    return {
      person,
      changeInfo,
      hoppy
    }

    // 返回一个函数(渲染函数)
    // return ()=> h('h1','尚硅谷')
  }
}
</script>

