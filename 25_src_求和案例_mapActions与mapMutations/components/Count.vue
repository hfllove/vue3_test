<template>
  <div class="root">
      <h1>当前求和为：{{ sum }}</h1>
      <h3>当前求和放大十倍为：{{ bigSum }}</h3>
      <h1>我在{{ school }},学习{{ subject }}</h1>
      <select v-model.number="n">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
      </select>
      <button @click="increment(n)">+</button>
      <button @click="decrement(n)">-</button>
      <button @click="jiaOdd(n)">当为奇数时再加</button>
      <button @click="jiaWait(n)">等等再加</button>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    name: 'Count',
    data() {
        return {
            n: 1, // 用户选择的数字
        }
    },
    methods:{
        // 程序员亲自写方法
        // increment() {
        //     this.$store.commit('JIA',this.n)
        // },
        // decrement() {
        //     this.$store.commit('JIAN',this.n)
        // },

        // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
        ...mapMutations({increment:'JIA',decrement:'JIAN'}),

        // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(数组写法)
        // ...mapMutations(['JIA','JIAN']),

        // increment () {
        //     this.atguiguJia(this.n)
        //     console.log(this) // this 指的是state对象
        // },
        // decrement () {
        //     this.atguiguJian(this.n)
        // },

        ...mapMutations({atguiguJia:'JIA',atguiguJian:'JIAN'}),

        /**************************************************************************/ 
        
        // 程序员亲自写方法
        // incrementOdd() {
        //     this.$store.dispatch('jiaOdd',this.n)
        // },
        // incrementWait() {
        //     this.$store.dispatch('jiaWait',this.n)
        // },  

        // 借助mapActions生成对应方法，方法中会调用dispatch去联系actions(对象写法)
        // ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),

        // 借助mapActions生成对应方法，方法中会调用dispatch去联系actions(数组写法)
        ...mapActions(['jiaOdd','jiaWait'])
    },
    computed: {
        // 靠程序员亲手写的计算属性
        // sum () {
        //     return this.$store.state.sum
        // },
        // school () {
        //     return this.$store.state.school
        // },
        // subject () {
        //     return this.$store.state.subject
        // },

        // 借助mapState生成计算属性，从state中读取数据(对象写法)
        // ...mapState({sum:'sum',school:'school',subject:'subject'}),
        // 借助mapState生成计算属性，从state中读取数据(数组写法)
        ...mapState(['sum','school','subject']),

/**********************************************************************************/

        // 靠程序员亲手写的计算属性
        // bigSum () {
        //     return this.$store.getters.bigSum
        // },     
        
        // 借助mapGetters生成计算属性，从state中读取数据(对象写法)
        // ...mapGetters({bigSum:'bigSum'}),
        // 借助mapGetters生成计算属性，从state中读取数据(数组写法)
        ...mapGetters(['bigSum'])
    },
    mounted () {
        // console.log('Count',this)
        const x = mapState({sum:'sum',school:'school',subject:'subject'})
        console.log(x)
    }
}
</script>

<style>
    button {
        margin-left: 5px;
    }
</style>