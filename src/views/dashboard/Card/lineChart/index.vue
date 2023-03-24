<template>
<!-- ###1 折线图 -->
    <div class="charts" ref="charts">

    </div>
</template>

<script>
// ###1 引入echart
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts';
export default {
    name: "lineChart",
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
.charts {
    height: 100%;
    width: 100%;
}
</style>