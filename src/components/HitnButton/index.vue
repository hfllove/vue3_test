<template>
<!--###1 封装一个鼠标悬浮的title提示按钮 -->
  <a :title="title" style="margin: 10px;">
      <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
    // 这里的name是用来在Vue浏览器插件上显示的
    name: 'HitnButton',
    props: ['title']
}
</script>

<style>

</style>