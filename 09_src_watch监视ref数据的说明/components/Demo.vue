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

import {reactive, ref,watch} from 'vue'
export default {
    name: 'Demo',

    // Vue2里的监视
    //#region 
    // watch:{
    //     // sum (newValue,oldValue) {
    //     //     console.log('sum的值变化了',newValue,oldValue)
    //     // }
    //     sum: {
    //         immediate: true,// 立即监听一下
    //         deep:true,
    //         handler (newValue,oldValue) {
    //             console.log('sum的值变化了',newValue,oldValue)
    //         }
    //     }
    // },
    //#endregion

    setup () {
        // 数据
        let sum = ref(0)
        let msg = ref('你好啊')
        let person = ref({
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
        
        console.log(person)

        watch(sum,(newValue,oldValue)=>{
            console.log('sum的值改变了',newValue,oldValue)
        })
        /*
        监视
        由ref所定义的person对象，其value是Proxy对象。因为watch监视的是person里面的值。
        所以，要用watch属性监视person：
        1.开启深度监视 deep: true
        2.person.value
        */
        
        watch(person,(newValue,oldValue)=>{
            console.log('person中的值改变了',newValue,oldValue)
        },{deep:true})

        // watch(person.value,(newValue,oldValue)=>{
        //     console.log('person中的值改变了',newValue,oldValue)
        // })

        // 返回一个对象(常用)
        return {
            sum,
            msg,
            person
        }
    }
}
</script>

