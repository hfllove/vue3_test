<template>
  <div>
      <h2>学校名称：{{ name }}</h2>
      <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
// 引入一个局部混合配置项
// import {hunhe} from '../mixin'

export default {
    name:'School',
    data(){
        return {
            name:'尚硅谷',
            address:'北京昌平'
        }
    },
    // mixins:[hunhe]    
}
</script>

<style>

</style>