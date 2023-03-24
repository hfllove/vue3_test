<template>
  <div>
    <h2>深入v-model</h2>
    <!-- <input type="text" v-model="msg"> -->
    <!-- <span>{{msg}}</span> -->
    <br>
    <h2>深入v-model原理</h2>
    <!-- 原生DOM当中是有oninput事件：当表单元素发生文本的变化的时候就会立即出发 -->
    <!-- <input type="text" :value="msg" @input=" msg = $event.target.value"/> -->
    <!-- <span>{{msg}}</span> -->
    <span>{{ggmsg}}</span>
    <!--并非原生DOM：自定义组件-->
    <!-- <CustomInput :value="msg" @input="msg = $event"></CustomInput>     -->

    <!-- 
      给子组件绑定props，传递msg参数的值，给子组件绑定自定义事件，`input`是触发回调函数ttName($event)的标识，
     -->
    <!-- <CustomInput :value="msg" @input="ttName($event)"></CustomInput>     -->
    
    <!-- 手动测试 -->
    <CustomInput :value="ggmsg" @ggkk="ggName($event)"></CustomInput>    

    <!-- v-model的效果 -->
    <!-- <CustomInput v-model="msg"></CustomInput> -->
    <hr>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    data() {
      return {
         msg:"我爱塞北的大雪呀",
         ggmsg: "测试自定义事件"
      }
    },
    methods: {
      // ttName (event) {
      //   this.msg = event
      // },
      ggName (event) {
        this.ggmsg = event
      }
    },
    components: {
      CustomInput
    }
  }
</script>
