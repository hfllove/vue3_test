<template>
  <div class="school">
      <h2>学校名称：{{ name }}</h2>
      <h2>学校地址：{{ address }}</h2>
      <button @click="sendSchoolName">点击发送学校名到App</button>
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
    methods: {
        sendSchoolName () {
            this.getSchoolName(this.name)
        }
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