<template>
  <div class="nice-goods">
    <div class="le-container find-goods">
      <a href="javascript:;" class="nice-goods__logo nice-goods__logo--bg-3">
        <div class="logo-container">
          <div class="logo-text">
            探索新生活
            <i class="logo_arrow"></i>
          </div>
        </div>
      </a>
      <div class="nice-goods__recommends">
        <div class="goods-list">
          <a
            href="javascript:;"
            class="goods"
            :class="[
              { goods_bottom: index % 2 == 0 },
              { goods_top: index % 2 != 0 },
            ]"
            v-for="(goodsItem, index) in nicegoodsList"
            :key="goodsItem.id"
          >
            <div class="goods__name" v-show="index % 2 == 0">
              {{ goodsItem.goodsName }}
            </div>
            <div class="goods__image">
              <div class="lazyimg lazyimg_loaded">
                <img :src="goodsItem.imgUrl" alt="" class="lazyimg_img" />
              </div>
            </div>
            <div class="goods__name" v-show="index % 2 != 0">
              {{ goodsItem.goodsName }}
            </div>
          </a>
        </div>
        <div class="scroll-bar">
          <span class="scroll-points"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "",
  mounted() {
    this.$store.dispatch("getNiceGoodsList");
    // this.$nextTick(function() {
    //   this.moveNicegoods()
    // })
  },
  computed: {
    ...mapState({
      nicegoodsList: (state) => state.home.nicegoodsList,
    }),
  },
  watch: {
    nicegoodsList: {
      handler(newValue, oldValue) {
        this.$nextTick(function () {
          this.moveNicegoods();
        });
      },
    },
  },
  methods: {
    moveNicegoods() {
      // 当前页面的显示框
      var $recommends = $('.nice-goods__recommends')
      // 当前需要移动的图片列表
      var goodsList = $recommends.children('.goods-list')
      // goodsList的所有图片数目
      var goodsNum = goodsList.children('.goods').length
      // 单个图片在goodsList中所占的宽度(包括外边距)
      var goodOuterWidth = goodsList.children('.goods').outerWidth(true)
      // goodsList移动的总长度；5是这个图片的重复个数
      var moveDistance = goodOuterWidth * (goodsNum - 5)
      // console.log('moveDistance:'+moveDistance);
      // goodsList移动的总时间
      var totalTime = 40000
      // goodsList移动一次的单位时间
      var itemTime = 10

      // 定义一个定时器id
      var intervalId
      // 当前滑动块的位置
      var scroll_currLeft
      // 当前移动框的位置 
      var currLeft
      // 单位时间内偏移量
      var item_offset = - moveDistance / (totalTime / itemTime)
      // 目标位置
      var offset = - moveDistance
      var progressX

      // scroll滚动长条
      var scroll = $recommends.children('.scroll-bar')
      // scroll滚动长条的长度
      var scrollLength = $recommends.children('.scroll-bar').innerWidth()
      // 滑动块的长度
      var scrollPointLength = scroll.children('.scroll-points').innerWidth()
      // 定义一个鼠标位置的标识
      var next = false
      // 定义一个移动滑动块的标识
      var scroll_move = false
      // 让图片列表自动轮播
      showGoodsList(next,0,'hidden')

      // 鼠标进入当前模块区域
      $recommends.mouseenter(function () {
        next = true;
        showGoodsList(next, 1, "visible");

        // 鼠标进入滑动块
        scroll.children(".scroll-points").mouseenter(function () {
          // 鼠标按下滑动块
          scroll.children(".scroll-points").mousedown(function (event) {
            // 获取滑动块到当前可视窗口的left值
            var p = scroll.children(".scroll-points").offset();
            // 获取鼠标在当前滑动块内的x轴距离
            var innerX = event.pageX - p.left;
            innerX = Math.round(innerX * 10) / 10;
            // ### 绑定window对象内的鼠标滑动事件
            $(window).mousemove(function (event) {
              // 滑动长条的left值
              var leftBar = Math.round(scroll.offset().left);
              // 解绑当前区域的鼠标进入事件
              $recommends.unbind("mouseleave");
              // 标识移动滑动块
              scroll_move = true;
              // 滑动块的移动距离
              progressX = event.pageX - innerX - leftBar;

              if (progressX < 0) {
                progressX = 0;
              }
              if (progressX >= scrollLength - scrollPointLength) {
                progressX = scrollLength - scrollPointLength;
              }
              // 控制滚动块的移动
              scroll
                .children(".scroll-points")
                .css("transform", "translate3d(" + progressX + "px,0,0");
              showGoodsList(next, 1, "visible");
            });

            // 在当前模块区域弹起
            $recommends.mouseup(function () {
              // 取消移动滑动块
              scroll_move = false;
              // 解绑window的弹起事件
              $(window).unbind("mouseup");
              $recommends.mouseleave(function () {
                next = false;
                showGoodsList(next, 0, "hidden");
                scroll.children(".scroll-points").unbind("mouseenter");
                scroll.children(".scroll-points").unbind("mousedown");
                $recommends.unbind("mouseup");
                // 解绑window的弹起事件
                $(window).unbind("mouseup");
              });

              // 解绑鼠标的移动事件
              $(window).unbind("mousemove");
            });

            // 绑定window对象的鼠标弹起事件
            $(window).mouseup(function () {
              $(window).unbind("mousemove");
              scroll.children(".scroll-points").unbind("mouseenter");
              scroll.children(".scroll-points").unbind("mousedown");
              $recommends.unbind("mouseup");
              $(window).unbind("mouseup");
              // 取消鼠标移动标识
              scroll_move = false;
              next = false;
              showGoodsList(next, 0, "hidden");
            });
          });
        });
        // 鼠标离开当前区域
        $recommends.mouseleave(function () {
          scroll.children(".scroll-points").unbind("mouseenter");
          scroll.children(".scroll-points").unbind("mousedown");
          $recommends.unbind("mouseup");
          $(window).unbind("mouseup");
          $(window).unbind("mousemove");
          next = false;
          showGoodsList(next, 0, "hidden");
        });
      });

      /*
      自动轮播图片列表

      最为关键的设置
        var item_offset = - moveDistance/(tatalTime/itemTime)
    */
      function showGoodsList(next, opacityNum, visStyle) {
        clearInterval(intervalId);
        // 当前移动框的位置
        if (next === false) {
          currLeft = goodsList.position().left;
          currLeft = Math.round(currLeft * 10) / 10;

          // 开启一个定时器
          intervalId = setInterval(function () {
            // console.log('item_offset:'+item_offset);

            // #### 对当前的left值取整
            // currLeft = Number(currLeft + item_offset)
            currLeft = currLeft + item_offset;
            currLeft = Math.round(currLeft * 10) / 10;
            // #### 如果当前left值 等于 目标值
            if (Math.round(currLeft) === offset) {
              // 如果到达目的地，就直接跳转到left为零的位置
              currLeft = 0;
            }
            scroll_currLeft =
              -(currLeft / moveDistance) * (scrollLength - scrollPointLength);
            scroll_currLeft = Math.round(scroll_currLeft * 10) / 10;
            // 控制滑动块的移动
            scroll
              .children(".scroll-points")
              .css("transform", "translate3d(" + scroll_currLeft + "px,0,0");
            // 控制图片列表的移动
            goodsList.css("transform", "translate3d(" + currLeft + "px,0,0");
          }, itemTime);
        } else {
          if (scroll_move) {
            currLeft =
              -(progressX / (scrollLength - scrollPointLength)) * moveDistance;
            currLeft = Math.round(currLeft * 10) / 10;
          }
          if (Math.round(currLeft) === offset) {
            // clearInterval(intervalId)
            // 如果到达目的地，就直接跳转到left为零的位置
            currLeft = 0;
          }
          // 控制图片列表的移动
          goodsList.css("transform", "translate3d(" + currLeft + "px,0,0");
        }
        // 控制滚动长条的显示与隐藏
        scroll.css("opacity", opacityNum).css("visibility", visStyle);
      }
    },
  },
};
</script>

<style scoped>
/* ———— nice-goods 发现好货模块 ———— */
.nice-goods {
  outline: none;
}
.le-container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.find-goods {
  height: 260px;
  position: relative;
  padding-left: 200px;
  margin-bottom: 20px;
}
.nice-goods__logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #eee;
  background-size: 100% 100%;
}
.nice-goods__logo--bg-3 {
  background-image: url(./images/find-goods.png);
}
.nice-goods__logo .logo-container {
  /* 盒子的宽高 */
  width: 160px;
  height: 90px;
  /* 盒子的位置 */
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  /* background属性的应用 */
  background-image: url(./images/find-goods2.png);
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
}
.logo-container .logo-text {
  /* 位置 */
  padding-top: 55px;
  padding-left: 20px;
  padding-bottom: 10px;
  /* 自身的属性，文字大小，颜色 */
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}
.logo-text .logo_arrow {
  background: url(./images/sprite.png) no-repeat 0 -16px;
  position: relative;
  width: 16px;
  height: 16px;
  /* 位置 */
  margin-left: 6px;
  margin-top: -2px;
  display: inline-block;
  vertical-align: middle;
}
.logo-text .logo_arrow::after {
  content: "";
  /* 精灵图做图标样式 */
  background: url(./images/sprite.png) no-repeat 0 0;
  float: left;
  position: absolute;
  /* 位置 */
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  visibility: hidden;
  transition: all 0.2s ease;
}
.logo-text .logo_arrow:hover::after {
  visibility: visible;
}
/* ##### 右边的自动轮播大盒子 ##### */
.nice-goods__recommends {
  /* 位置 */
  margin-left: 10px;
  position: relative;
  /* 自身的属性 */
  height: 100%;
  background-color: white;
  overflow: hidden;
}
.nice-goods__recommends .goods-list {
  /* 位置 */
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
  width: 100%;
  white-space: nowrap;
  font-size: 0;
}
.goods-list .goods {
  /* 转换为行内块 */
  display: inline-block;
  /* 位置 */
  margin-right: 50px;
  /* 自身的属性 */
  width: 150px;
  vertical-align: top;
}
.goods-list .goods:hover .goods__name {
  color: #e1251b;
}
.goods-list .goods:hover .goods__image {
  opacity: 0.7;
}
.nice-goods__recommends .goods-list .goods_bottom {
  margin-top: 50px;
}
.nice-goods__recommends .goods-list .goods_top {
  margin-top: 20px;
}
.nice-goods__recommends .goods__name {
  /* 设置文本样式 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
  text-align: center;
  font-size: 14px;
  transition: all .4s ease;
}
.nice-goods__recommends .goods-list .goods_bottom .goods__name {
  margin-bottom: 10px;
}
.nice-goods__recommends .goods-list .goods_top .goods__name {
  margin-top: 10px;
}
.nice-goods__recommends .goods-list .goods__image {
  height: 150px;
  transition: opacity .4s ease;
}
.lazyimg {
  position: relative;
  overflow: hidden;
}
.lazyimg_loaded {
  background: transparent;
}
.nice-goods__recommends .goods-list .goods__image img {
  max-width: 150px;
  width: 150px;
  height: 100%;
}
/* ===== 右边轮播图滚动条区域 ===== */
.nice-goods__recommends .scroll-bar {
  /* 位置 */
  position: absolute;
  left: 15px;
  bottom: 10px;
  /* 自身属性 */
  width: calc(100% - 30px);
  height: 3px;
  background-color: #f3f3f3;
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  /* visibility: visible; */
  /* 过渡效果 */
  transition: opacity 0.3s ease;
}
.nice-goods__recommends .scroll-bar .scroll-points {
  /* 位置 */
  position: absolute;
  top: 50%;
  margin-top: -4.5px;
  /* 自身属性 */
  height: 9px;
  width: 99px;
  border-radius: 4px;
  background-color: #d8d8d8;
}
</style>