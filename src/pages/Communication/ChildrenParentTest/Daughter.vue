<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="geiQian(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
// 引入mixin混入对象
import aab from '@/pages/Communication/ChildrenParentTest/myMixin/myMixin.js'
export default {
  name: 'Daughter',
  mixins: [aab],
  data () {
    return {
      money: 20000
    }
  }
}
</script>
