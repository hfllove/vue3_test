<template>
  <div style="background: #ccc; height: 50px;">
    <!-- <h2>input包装组件----{{value}}</h2> -->
    <!-- <input :value="value"  @input="$emit('input',$event.target.value)"/> -->
    <br>
    <input :value="value"  @input="$emit('ggkk',childName)"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput',
    data () {
      return {
        childName: '我是子组件传过来的'
      }
    },
    props:['value']
  }
</script>
