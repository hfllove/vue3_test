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
        // 情况一：监视ref所定义的一个响应式数据
        // watch (sum,(newValue,oldValue)=>{
        //     console.log('sum变了',newValue,oldValue)
        // },{immediate:true,deep:true})

        // 情况二：监视ref所定义的多个响应式数据
        // watch ([sum,msg],(newValue,oldValue)=>{
        //     console.log('msg变了',newValue,oldValue)
        // })

        // 情况三： 监视reactive所定义的一个响应式数据的全部属性
        /*
          1.注意：此处无法正常获取到oldValue的值
          2.注意：强制开启了深度监视(deep配置无效)
        */
        // watch (person,(newValue,oldValue)=>{
        //     console.log(newValue,oldValue)
        // },{deep:false}) // 此处的deep配置无效

        // 情况四：监视reactive所定义的一个响应式数据中的某个属性
        // watch (()=>person.name,(newValue,oldValue)=>{
        //     console.log('person中name的值变了',newValue,oldValue)
        // })

        // 情况五：监视reactive所定义的一个响应式数据中的某些属性
        // watch ([()=>person.name,()=>person.age],(newValue,oldValue)=>{
        //     console.log('person中name或age变化了',newValue,oldValue)
        // })

        // 特殊情况
        watch (()=>person.job,(newValue,oldValue)=>{
            console.log('person中job的值改变了',newValue,oldValue)
        },{deep:false}) // 此处由于监视的是reactive所定义的对象中某个属性(依然为对象)，所以deep配置有效
        // 返回一个对象(常用)
        return {
            sum,
            msg,
            person
        }
    }
}
</script>

