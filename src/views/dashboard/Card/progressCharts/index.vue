<template>
    <div class="charts" ref="charts">
    </div>
</template>

<script>
// ###1 引入echart
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts';
export default {
    name: "progressCharts",
    mounted () {
        // ###2 初始化echarts实例
        let progressChart = echarts.init(this.$refs.charts)
        // ###2 配置数据
        progressChart.setOption({
            xAxis: {
                // 隐藏x轴
                show:false,   
                // ###3 最小值
                mini: 0,
                // ###3 最大值
                max: 100
            },
            yAxis: {
                // 隐藏y轴
                show: false,
                // 均分
                type: "category"
            },
            // 系列
            series: [
                {
                    type: 'bar',
                    data: [78],
                    color: 'yellowgreen',
                    // ###3 柱状图进度条宽度
                    barWidth: 8,
                    // ###3 背景颜色设置
                    showBackground: true,
                    backgroundStyle: {
                        color: '#eee'
                    },
                    // ###3 文本
                    label: {
                        show: true,
                        // 文本标签样式
                        formatter: '|',
                        // 文本标签位置
                        position: 'right'
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
.charts {
    height: 100%;
    width: 100%;
}
</style>