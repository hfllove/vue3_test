<template>
  <h1>一个人的信息</h1>
  <h1 v-show="person.name">姓名：{{ person.name }}</h1>
  <h2>年龄：{{ person.age }}</h2>
  <button @click="test">测试触发一下Demo组件中的Hello事件</button>
</template>

<script>
// import {h} from 'vue'

import {reactive} from 'vue'
export default {
    name: 'Demo',
    props: ['msg','school'],
    emits: ['hello'],
    setup (props,context) {
        // 数据
        // let name = ref('张三')
        // let age = ref(18)
        console.log('---setup---',props)
        // console.log('---setup---',context)
        // console.log('---setup---',context.attrs) // 详见于Vue2中的$attrs
        // console.log('---setup---',context.emit) // 触发自定义事件
    
        let person = reactive({
        name: '张三',
        age: 17
        })

    // 方法
    function test () {
        context.emit('hello',666)
    }

    // 返回一个对象(常用)
    return {
    person,
    test
    }
    }
}
</script>

