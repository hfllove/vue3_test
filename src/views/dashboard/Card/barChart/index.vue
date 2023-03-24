<template>
    <div class="charts" ref="charts">
    </div>
</template>

<script>
// ###1 引入echart
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts';
export default {
    name: "barChart",
    mounted () {
        // ###2 初始化echarts实例
        let barCharts = echarts.init(this.$refs.charts)
        // ###2 配置数据
        barCharts.setOption({
            xAxis: {
                // 隐藏x轴
                show:false,
                // 均分
                type: "category"
            },
            yAxis: {
                // 隐藏y轴
                show: false
            },
            // 系列
            series: [
                {
                    // ###3
                    type: 'bar',
                    data: [10,23,8,29,7,46,3,12,34,5,9],
                }
            ],
            // 布局调试
            grid: {
                left:0,
                top: 0,
                right: 0,
                bottom: 0
            },
            // 提示
            tooltip: {}
        })
    }
}
</script>

<style scoped>
.charts {
    height: 100%;
    width: 100%;
}
</style>