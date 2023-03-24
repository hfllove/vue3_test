<template>
  <div class="school">
      <h2>学校名称：{{ name }}</h2>
      <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
    name:'School',
    props: ['getSchoolName'],
    data(){
        return {
            name:'尚硅谷',
            address:'北京昌平'
        }
    },
    // methods: {
    //     demo (msgName,data) {
    //         console.log('有人发布了hello消息，hello消息的回调执行了',msgName,data)
    //     }
    // },
    mounted () {
        // console.log('School',this.$bus)
        // this.$bus.$on('hello',(data)=>{
        //     console.log('我是School组件，收到了数据',data)
        // })

        this.pubId = pubsub.subscribe('hello',(msgName,data)=>{
            console.log(this)
            console.log('有人发布了hello消息，hello消息的回调执行了',msgName,data)
        })
        // pubsub.subscribe('hello',this.demo)
    },   
       
    // } ,
    // 在销毁数据之前解绑bus上的事件
    beforeDestroy() {
        // this.$bus.$off('hello')
        pubsub.unsubscribe(this.pubId)
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