<template>
  <h2>当前sum值为：{{sum}}</h2>
  <button @click="sum++">sum++</button>
  <h1>{{person}}</h1>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>薪资：{{job.a.b.salary}}K</h2>
  <h2 v-show="person.car">座驾信息：{{person.car}}</h2>
  <button @click="name+='~'">修改姓名</button>
  <button @click="age++">修改年龄</button>
  <button @click=" job.a.b.salary++">修改薪资</button>
  <hr>
  <br>
  <button @click="showRawPerson">输出最原始的person</button>
  <hr>
  <button @click="addCar">添加一辆车</button>
  <button @click="person.car.name+='!'">修改车名</button>
  <button @click="changePrice">修改车价</button>
</template>

<script>
// import {h} from 'vue'

import {reactive,toRefs,ref,toRaw,markRaw} from 'vue'
export default {
    name: 'Demo',
    setup () {
        // 数据
        // let person = shallowReactive({ // 只考虑第一层数据的响应式
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
        
        let sum = ref(0)

        function showRawPerson () {
          // toRaw 所呈现的是没有被reactive代理的，储存在数据库的数据。
          const p = toRaw(person)
          // p.age++
          console.log(p)
        }
        
        // markRaw 只能保证被包裹的数据，在页面上不再是响应式
        function addCar () {
          let car = {name:'奔驰',price: 40}
          person.car = markRaw(car)
        }

        function changePrice () {
          person.car.price++
          console.log(person.car.price)
        }
        // 返回一个对象(常用)

        // toRef 是对原来的数据对象地址进行引用，没有形成新的数据
        return {
          addCar,
          person,
          sum,
          changePrice,
          showRawPerson,
          ...toRefs(person)
        }

        
    }
}
</script>

