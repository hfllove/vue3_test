<template>
  <div class="son">
      <h2>我是Son孙组件,{{car.name}}--{{car.price}}</h2>
  </div>
</template>

<script>
import {inject} from 'vue'
export default {
    name: 'Son',
    setup () {
      let car = inject ('car')
      console.log('###',car)

      return {car}
    }
}
</script>

<style>
  .son {
      background-color: orange;
      padding: 10px;
  }
</style>