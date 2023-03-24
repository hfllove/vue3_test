<template>
  <div class="type-nav">
    <div class="container">
      <!-- 下拉菜单栏dropdown -->
      <div class="dropdown" @mouseenter="enterShow" @mouseleave="leaveShow">
        <h2 class="dt">全部商品分类</h2>
        <div class="dd" @click="goSearchId" v-show="show">
          <transition name="topmenu">
            <ul class="topmenu" >
            <!-- 一级分类标题 -->
            <li
              class="cate_menu_item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="changeIndex(index)"
              :class="{ cur: currentIndex == index }"
            >
              <a
                :data-categoryName="c1.categoryName"
                :data-category1Id="c1.categoryId"
                >{{ c1.categoryName }}</a
              >
            </li>
          </ul>
          </transition>
          <div
            id="popCtn"
            class="cate_pop"
            :style="{ display: currentIndex == -1 ? 'none' : 'block' }"
          >
            <div
              class="cate_part clearfix"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :style="{ display: currentIndex == index ? 'block' : 'none' }"
            >
              <div class="cate_part_col1">
                <!--  -->
                <div class="cate_channel">
                  <a href="javascript:;" class="cate_channel_lk">
                    家电馆
                    <!-- 向右的字体图标 -->
                    <i class="iconfont icon-icon-test1"></i>
                  </a>
                  <a href="javascript:;" class="cate_channel_lk">
                    个护馆
                    <!-- 向右的字体图标 -->
                    <i class="iconfont icon-icon-test1"></i>
                  </a>
                  <a href="javascript:;" class="cate_channel_lk">
                    直营店
                    <!-- 向右的字体图标 -->
                    <i class="iconfont icon-icon-test1"></i>
                  </a>
                </div>
                <div class="cate_detail">
                  <dl
                    class="cate_detail_item cate_detail_item1"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <!-- 二级分类标题 -->
                    <dt class="cate_detail_tit">
                      <a
                        class="cate_detail_tit_lk"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                      >
                        {{ c2.categoryName }}
                        <!-- 向右的字体图标 -->
                        <i class="iconfont icon-icon-test1"></i>
                      </a>
                    </dt>
                    <!-- 三级分类标题 -->
                    <dd class="cate_detail_con">
                      <a
                        class="cate_detail_con_lk"
                        v-for="c3 in c2.categoryChild"
                        :key="c3.categoryId"
                        :data-categoryName="c3.categoryName"
                        :data-category3Id="c3.categoryId"
                      >
                        {{ c3.categoryName }}</a
                      >
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="cate_part_col2">
                <div class="cate_brand">
                  <a href="javascript:;" class="cate_brand_lk">
                    <img src="./images/bosideng.webp" alt="" />
                  </a>
                  <a href="javascript:;" class="cate_brand_lk">
                    <img src="./images/bosideng.webp" alt="" />
                  </a>
                  <a href="javascript:;" class="cate_brand_lk">
                    <img src="./images/bosideng.webp" alt="" />
                  </a>
                  <a href="javascript:;" class="cate_brand_lk">
                    <img src="./images/bosideng.webp" alt="" />
                  </a>
                </div>
                <div class="cate_promotion">
                  <a href="javascript:;" class="cate_promotion_lk">
                    <img src="./images/qidongjietou.webp" alt="" />
                  </a>
                  <a href="javascript:;" class="cate_promotion_lk">
                    <img src="./images/qidongjietou.webp" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 导航栏组navitems -->
      <div class="navitems">
        <ul>
          <li><a href="#" class="style_red_bold">秒杀</a></li>
          <li><a href="#">服装城</a></li>
          <li><a href="#">美妆馆</a></li>
          <li><a href="#">传智超市</a></li>
          <li><a href="#">全球购</a></li>
          <li><a href="#">闪购</a></li>
          <li><a href="#">团购</a></li>
          <li><a href="#">拍卖</a></li>
          <li><a href="#">有趣</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 借助辅助函数mapState将仓库里的数据引入到组件上
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  // 挂载完成后,向服务器派发请求
  mounted() {
    if(this.$route.path !='/home'){
      this.show = false
    }
  },
  methods: {
    changeIndex(index) {
      // currentIndex = this.index
      this.currentIndex = index;
    },
    // 点击三级联动菜单，带参数进行跳转
    goSearchId(event) {
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      if (categoryname) {
        let loction = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        loction.query = query
        if(this.$route.params){
          loction.params = this.$route.params
        }
        this.$router.push(loction)
      } 
    },
    // 鼠标进入，展示三级联动一级菜单
    enterShow() {
      this.show = true
    },
    // 鼠标离开，隐藏三级联动一级菜单
    leaveShow() {
      this.currentIndex = -1;
      if(this.$route.path != '/home'){
        this.show = false
      }
    }
  },
  computed: {
    ...mapState({
      // 当在页面中使用计算属性categoryList时，右侧函数自动执行一次，会自动将state注入到组件上，而这个state就是大仓库
      categoryList: (state) => state.home.categoryList,
    })
  }
};
</script>

<style scoped>
.hover {
  background-color: #d9d9d9;
}
.type-nav {
  height: 45px;
  border-bottom: 2px solid #b1191a;
}
.type-nav .container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
/*导航栏里的下拉菜单栏*/
.type-nav .dropdown {
  float: left;
  width: 210px;
  height: 45px;
  background-color: #b1191a;
}
/*导航栏里的导航栏组*/
.type-nav .navitems {
  float: left;
}
/*导航栏里的下拉菜单栏标题*/
.dropdown .dt {
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  line-height: 45px;
  font-size: 16px;
}
/*导航栏里的下拉菜单栏内容dropdown*/
.dropdown .dd {
  /* display: none; */
  position: relative;
  width: 210px;
  height: 465px;
  z-index: 10;
}
.dd .topmenu {
    overflow: hidden;
    background-color: #fff;
}
.type-nav .topmenu-enter {
  height: 0px;
}
.type-nav .topmenu-enter-to {
  height: 465px;
}
.type-nav .topmenu-enter-active {
  transition: all .5s ease;
}
.cur {
  background-color: #d9d9d9;
}
/* ===== 右边浮出栏 ===== */
.dd .cate_pop {
  position: absolute;
  top: 0;
  left: 211px;
  width: 990px;
  min-height: 465px;
  border: 1px solid #f7f7f7;
  background-color: #fff;
  box-shadow: 2px 0 5px rgb(0, 0, 0, 0.3);
  transition: top 0.25s ease;
  z-index: 999;
}
/* ----- 每个一级菜单右边浮出栏的展示内容大盒子 ----- */
.cate_part {
  /* 用来设置内边距 */
  padding: 20px 0 10px;
}
/* ----- 浮出栏左边二级标题内容 ----- */
.cate_part_col1 {
  float: left;
  width: 800px;
}
.cate_channel {
  overflow: hidden;
  padding-left: 20px;
  height: 24px;
}
.cate_channel_lk {
  float: left;
  margin-right: 10px;
  padding: 0 10px;
  height: 24px;
  background-color: #333;
  line-height: 24px;
  color: #fff;
}
.cate_channel_lk:hover {
  background-color: #c81623;
  color: #fff;
}
.cate_channel_lk .icon-icon-test1 {
  display: inline-block;
  margin-left: 4px;
  font-size: 12px;
}
.cate_detail {
  overflow: hidden;
  padding: 10px 0 0 20px;
}
.cate_detail_item {
  position: relative;
  padding-left: 80px;
}
.cate_detail_tit {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 6px;
  width: 70px;
  text-align: right;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cate_detail_tit_lk {
  color: #333;
  font-weight: 700;
}
.cate_detail_tit_lk:hover {
  color: #c81623;
}
.cate_detail_tit_lk .icon-icon-test1 {
  display: inline-block;
  margin-left: 4px;
  font-size: 12px;
}
.cate_detail_con {
  display: inline-block;
  overflow: hidden;
  width: 700px;
  padding: 5px 0;
}
.cate_detail_con_lk {
  float: left;
  margin: 3px 0;
  padding: 0 7px;
  height: 16px;
  line-height: 16px;
  white-space: nowrap;
}
/* ----- 浮出栏右边品牌、广告促销内容 ----- */
.cate_part_col2 {
  float: left;
  width: 188px;
}
.cate_brand {
  margin: auto;
  width: 168px;
  font-size: 0;
}
.cate_brand_lk {
  overflow: hidden;
  display: inline-block;
  width: 83px;
  height: 35px;
  margin: 0 0 1px 1px;
  background-color: #e7e7e7;
}
.cate_brand_lk img {
  width: 83px;
  aspect-ratio: auto 83 / 35;
  height: 35px;
}
.cate_promotion {
  margin: 10px auto 0;
  width: 168px;
}
.cate_promotion_lk {
  display: block;
  margin-bottom: 1px;
  height: 134px;
  background-color: #e7e7e7;
}
/*给每个一级分类标题设置样式*/
.dropdown .dd ul li {
  height: 31px;
  line-height: 31px;
  padding-left: 10px;
}
.dropdown .dd ul li a {
  font-size: 14px;
}
/*添加字体图标*/
/* .dropdown .dd ul li::after{
	font-family: 'iconfont';
	content: "\e658";
} */
/* 导航栏组navitems */
.navitems {
  width: 990px;
  height: 43px;
  padding-left: 15px;
  background-color: #fff;
}
.navitems ul li a {
  float: left;
  height: 43px;
  margin: 0 12px;
  font-size: 15px;
  line-height: 43px;
}
</style>