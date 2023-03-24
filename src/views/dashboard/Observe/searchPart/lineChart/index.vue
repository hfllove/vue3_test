<template>
  <div>
      <!-- ###3 处理封装组件的静态结构 -->
      <div class="header">
          <span class="search-header">搜索用户数</span>
          <i class="iconfont icon-jinggao"></i>
      </div>
      <div class="container">
          <span class="key-word">1212</span>
          <span>17.1</span>
          <i class="iconfont icon-xiangshang1"></i>
          <i class="iconfont icon-xiangxia1"></i>
      </div>
      <div class="footer">
          <div class="charts" ref="charts"></div>
      </div>
  </div>
</template>

<script>
import *as echarts from 'echarts'
export default {
  name: '',
  mounted () {
        // ###2 初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts)
        // ###2 配置数据
        lineCharts.setOption({
            xAxis: {
                // 隐藏x轴
                show:false,
                // 类目型折线---散点
                type: "category"
            },
            yAxis: {
                // 隐藏y轴
                show: false
            },
            // 系列
            series: [
                {
                    type: 'line',
                    data: [10,23,8,29,7,46,3,12],
                    // 使曲线平滑
                    smooth: true,
                    // 拐点的样式设置
                    itemStyle: {
                        opacity: 0
                    },
                    // 线条的样式
                    lineStyle: {
                        color: 'purple'
                    },
                    // 填充颜色设置
                    areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "purple", // 0%处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#fff", // 100%处的颜色
                                }
                            ],
                            global: false, // 缺省为 false
                        }
                    }
                }
            ],
            // 布局调试
            grid: {
                left:0,
                top: 0,
                right: 0,
                bottom: 0
            }
        })
    }
}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    color: #999;
}
.header .search-header{
    margin-right: 10px;
}
/* .header i{
    position: relative;
}
.header i::before {
    position:absolute;
    top: 0px;
    left: 56px;
    font-size: 18px;
    line-height: 18px;
    color: #999;
} */
.header i {
    font-size: 18px;  
}
.icon-xiangshang1 {
    color: red
}
.icon-xiangxia1 {
    color:green;
}
.container {
    margin-top: 20px;
}
.container .key-word {
    font-size: 30px;
    margin-right: 30px;
}
.container i {
    margin-left: 10px;
}
.charts {
    width: 100%;
    height: 50px;
}
</style>