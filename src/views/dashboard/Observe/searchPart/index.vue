<template>
  <el-card>
    <!--###1 搜索头部 -->
    <div slot="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <!--###2 点击 ··· 悬浮显示下拉框 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--###1 搜索内容 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <!-- ###1 封装组件 -->
          <lineChart></lineChart>
        </el-col>
        <el-col :span="12">
          <lineChart></lineChart>
        </el-col>
      </el-row>
      <el-table style="width: 100%" :data="tableData" border>
        <el-table-column prop="date" label="排名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="180">
        </el-table-column>
        <el-table-column prop="address" sortable label="用户数">
        </el-table-column>
        <el-table-column prop="address" sortable label="周涨幅">
        </el-table-column>
      </el-table>
      <el-pagination
      style="text-align:right;"
        layout="prev, pager, next"
        :total="1000">
  </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineChart from "./lineChart";
export default {
  name: "",
  components: {
    lineChart,
  },
  data() {
    return {
      tableData: [{}],
    };
  },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
</style>