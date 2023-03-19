<template>
  <h2>当前求和为：{{ sum }}</h2>
  <button @click="sum++">点我+1</button>
  <h2>当前的信息为：{{ msg }}</h2>
  <button @click="msg+='!'">修改信息</button>
  <br>
  <h2>姓名：{{person.name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <h2>薪资：{{person.job.a.b.salary}}K</h2>
  <button @click="person.name+='~'">修改姓名</button>
  <button @click="person.age++">修改年龄</button>
  <button @click="person.job.a.b.salary++">修改薪资</button>
</template>

<script>
// import {h} from 'vue'

import {reactive, ref,watch,watchEffect} from 'vue'
export default {
    name: 'Demo',
    setup () {
        // 数据
        let sum = ref(0)
        let msg = ref('你好啊')
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
        
        // 监视
        // watch(person,(newValue,oldValue)=>{
        //     console.log('person中的值改变了',newValue,oldValue)
        // },{immediate:true})

        watchEffect(()=>{
            const x1 = sum.value
            const x2 = person.job.a.b.salary
            console.log('watchEffect所监视的属性改变了')
        })

        // 返回一个对象(常用)
        return {
            sum,
            msg,
            person
        }
    }
}
</script>

