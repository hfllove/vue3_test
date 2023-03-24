<template>
  <div class="child">
      <h2>我是Child子组件</h2>
      {{sum}}
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: 'Child',
    async setup () {
        let sum = ref(0)

        // return new Promise((resolve,reject)=>{
        //     setTimeout(()=>{
        //         resolve({sum})
        //     },3000)
        // })

        const p = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve({sum})
            },3000)
        })

        return await p 
    }
}
</script>

<style>
  .child {
      background-color: skyblue;
      padding: 10px;
  }
</style>