<template>
  <h1>{{person}}</h1>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>薪资：{{job.a.b.salary}}K</h2>
  <button @click="name+='~'">修改姓名</button>
  <button @click="age++">修改年龄</button>
  <button @click=" job.a.b.salary++">修改薪资</button>
</template>

<script>
// import {h} from 'vue'

import {reactive, toRef,toRefs,ref} from 'vue'
export default {
    name: 'Demo',
    setup () {
        // 数据
        let person = reactive({
            name: '李四',
            age: 18,
            job: {
                a:{
                    b:{
                        salary: 19
                    }
                }
            }
        })
        
        // 返回一个对象(常用)

        // ref 是将原来的数据复制成相同的新数据
        // return {
        //     person,
        //     name:ref(person.name),
        //     age:ref(person.age),
        //     job.a.b.salary:ref(person.job.a.b.job.a.b.salary),
        // }

        const x = toRefs(person)
        console.log('####',x)

        // toRef 是对原来的数据对象地址进行引用，没有形成新的数据
        return {
          person,

          // name:toRef(person,'name'),
          // age:toRef(person,'age'),
          // job.a.b.salary:toRef(person.job.a.b,'job.a.b.salary'),
          x,
          ...toRefs(person)
        }

        
    }
}
</script>

