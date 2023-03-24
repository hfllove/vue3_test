<template>
  <div class="school">
      <h2>学校名称：{{ name }}</h2>
      <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
    name:'School',
    props: ['getSchoolName'],
    data(){
        return {
            name:'尚硅谷',
            address:'北京昌平'
        }
    },
    mounted () {
        console.log('School',this.$bus)
        this.$bus.$on('hello',(data)=>{
            console.log('我是School组件，收到了数据',data)
        })
       
       
    } ,
    // 在销毁数据之前解绑bus上的事件
    beforeDestroy() {
        this.$bus.$off('hello')
    }
}
</script>

<style scoped>
    .school {
        background-color: orange;
        padding: 5px;
        margin-top: 30px;
    }
</style>