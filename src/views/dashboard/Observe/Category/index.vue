<template>
  <el-card>
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <!-- v-model="radio1" -->
      <el-radio-group v-model="value">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
      </div>
    </div>
    <div></div>
  </el-card>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      value: '全部渠道',
    }
  }
};
</script>

<style scoped>
>>>.el-card__header {
    padding: 7px 20px;
    border-bottom: 1px solid #EBEEF5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>  