<template>
    <div>
        <!-- ###1 
            布局：采用栅栏式(layout)布局
            边框：用el-card实现阴影效果
         -->
        <el-row :gutter="10">
            <el-col :span="6">
                <el-card>
                    <Detail title="总销售额" count="¥ 123122">
                        <template slot="charts">
                            <span>周同比&nbsp;&nbsp;34.31%&nbsp;&nbsp;<i class="iconfont icon-xiangshang1"></i></span>
                            <span>日同比&nbsp;&nbsp;14.61%&nbsp;&nbsp;<i class="iconfont icon-xiangxia1"></i></span>
                        </template>
                        <template slot="footer">
                            <span>日销售额&nbsp;¥&nbsp;&nbsp;23423</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <Detail title="访问量" count="54141">
                        <template slot="charts">
                            <!--###2 使用lineChart -->
                            <lineChart></lineChart>
                        </template>
                        <template slot="footer">
                            <span>日访问量&nbsp;&nbsp;12131</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <Detail title="支付笔数" count="15451">
                        <template slot="charts">
                            <barChart></barChart>
                        </template>
                        <template slot="footer">
                            <span>转化率&nbsp;&nbsp;48%</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <Detail title="运营活动效果" count="78%">
                        <template slot="charts">
                            <progressCharts></progressCharts>
                        </template>
                        <template slot="footer">
                            <span>周同比&nbsp;&nbsp;34.31%&nbsp;&nbsp;<i class="iconfont icon-xiangshang1"></i></span>
                            <span>日同比&nbsp;&nbsp;14.61%&nbsp;&nbsp;<i class="iconfont icon-xiangxia1"></i></span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressCharts from './progressCharts'
export default {
    name: 'Card',
    components:{
        Detail,
        lineChart,
        barChart,
        progressCharts,
    }
}
</script>

<style scoped>
.icon-xiangshang1 {
    color: turquoise;
}
.icon-xiangxia1 {
    color: indianred;
}
</style>