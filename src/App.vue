<template>
  <div>
    <!-- 自定义插件 -->
    <!-- <h1 v-ddd="msg"></h1> -->
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: '', 
  data() {
    return{
      msg: 'abc'
    }
  },
  components: {
    Header,
    Footer
  },
  mounted () {
    // 通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>
</style>
