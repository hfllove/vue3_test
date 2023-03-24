<template>
  <div>
      <!-- ###1 
        首页Detail分为四个部分：
            标题、内容区域、图标区域、底部 
      -->
      <div class="card-header">
          <span>{{title}}</span>
          <i class="iconfont icon-jinggao"></i>
      </div>
      <div class="card-content">{{count}}</div>
      <div class="card-charts">
          <!-- 具名插槽 -->
          <slot name="charts"></slot>
      </div>
      <div class="card-footer">
          <slot name="footer"></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Detail',
    props: ['title','count']
}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
}
.card-content {
    font-size: 30px;
    padding: 10px 0;
}
.card-charts {
    height: 50px;
}
.card-charts span {
    display: inline-block;
    margin-right:  12px;
    margin-top: 10px;
}
.card-footer {
    border-top: 1px solid #eee;
    padding-top: 18px;
}
</style>