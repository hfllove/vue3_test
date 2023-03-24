<template>
  <div class="category">
      <h3>{{title}}分类</h3>
      <slot :games="games">我是一些默认内容</slot>
  </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['title'],
    data () {
        return {
            games: ['星露谷物语','饥荒','我的世界','英雄联盟'],
        }
    }
}
</script>

<style>
    .category {
        background-color: skyblue;
        height: 300px;
        width: 200px;
    }
    h3{
        text-align: center;
        background-color: orange;
    }
</style>