<template>
  <el-card class="box-card">
    <!-- ###1 头部区域 -->
    <div slot="header" class="clearfix">
      <!-- 
          ###1 头部左侧 el-tabs 标签页
       -->
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <!-- ###1 头部右侧内容 -->
      <div class="right">
        <span @click="setToday">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- ###4 收集日历的数据v-model，并且整理value-format -->
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- ###2 内容区域 -->
    <div>
      <el-row :gutter="10">
        <!-- 内容左侧 -->
        <el-col :span="18">
          <div class="charts" ref="charts"></div>
        </el-col>
        <!-- ###3内容右侧 -->
        <el-col :span="6" class="rMsg">
          <h3>门店{{ title }}排名</h3>
          <ul>
            <li>
              <span class="rindex">1</span>
              <span>肯德基</span>
              <span class="rvalue">2342334123</span>
            </li>
            <li>
              <span class="rindex">2</span>
              <span>肯德基</span>
              <span class="rvalue">234234123</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>肯德基</span>
              <span class="rvalue">3321423</span>
            </li>
            <li>
              <span>4</span>
              <span>肯德基</span>
              <span class="rvalue">334231</span>
            </li>
            <li>
              <span>5</span>
              <span>肯德基</span>
              <span class="rvalue">12234</span>
            </li>
            <li>
              <span>6</span>
              <span>肯德基</span>
              <span class="rvalue">52342</span>
            </li>
            <li>
              <span>7</span>
              <span>肯德基</span>
              <span class="rvalue">42342</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import {mapState} from 'vuex'
export default {
  name: "Sale",
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts);
    this.myCharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
          color: "yellowgreen",
        },
      ],
    });
  },
  data() {
    return {
      activeName: "sale",
      // ###4 将echarts的实例挂载到组件上
      myCharts: null,
      //   收集日历的数据
      date: [],
    };
  },
  methods: {
    // ###4 点击【今日】的回调
    setToday() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    // ###4 点击【本周】的回调
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //   ###4 点击【本月】的回调
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    //   ###4 点击【本年】的回调
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
  computed: {
    // ###4 计算属性--切换内容右侧的排行榜标题
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    ...mapState({
      listState: state => state.home.list
    })
  },
  //   监听属性
  watch: {
    // ###4  监听计算属性title，如果发生改变，则更新图表的标题
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title+"趋势",
        },
        xAxis: [
        {
          data: this.title =="销售额"?this.listState.orderFullYearAxis:this.listState.userFullYearAxis
        },
      ],
      series: [
        {
          data: this.title =="销售额"?this.listState.orderFullYear:this.listState.userFullYear
        },
      ]
      });
    },
    listState () {
          this.myCharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
        
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: this.listState.orderFullYear,
          color: "yellowgreen",
        },
      ],
    });      
    }
  },
};
</script>

<style scoped>
.box-card {
  margin: 10px 0;
}
/* 深度选择器 穿透属性 */
>>> .el-card__header {
  border-bottom: none;
}
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
  top: 10px;
}
.date {
  width: 250px;
  margin: 0 0 0 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
.rMsg span {
  margin-left: 20px;
}
.rMsg .rindex {
  color: white;
  font-size: 16px;
  z-index: 99;
}
/* ###3  给li加元素选择器:nth-child筛选li，然后给筛选的li里面的span加::after*/
li:nth-of-type(1) .rindex::after {
  position: absolute;
  top: 0;
  left: 12px;
  content: "1";
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  text-align: center;
}
li:nth-of-type(2) .rindex::after {
  position: absolute;
  top: 0;
  left: 12px;
  content: "2";
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ff7b00ea;
  color: #fff;
  text-align: center;
}
li:nth-of-type(3) .rindex::after {
  position: absolute;
  top: 0;
  left: 12px;
  content: "3";
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ffbb00ea;
  color: #fff;
  text-align: center;
}
.rvalue {
  float: right;
  margin-right: 40px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  position: relative;
  margin: 20px 0;
  height: 8%;
  line-height: 24px;
}
</style>