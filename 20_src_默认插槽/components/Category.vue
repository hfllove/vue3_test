<template>
  <div class="category">
      <h3>{{title}}分类</h3>
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['title']
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