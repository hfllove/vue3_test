<template>
  <div class="child">
      <h2>我是Child子组件</h2>
      <Son/>
  </div>
</template>

<script>
import Son from './Son'
export default {
    name: 'Child',
    components: {Son},
    setup () {
        return {
            
        }
    }
}
</script>

<style>
  .child {
      background-color: skyblue;
      padding: 10px;
  }
</style>