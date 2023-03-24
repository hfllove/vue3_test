<template>
  <div class="list-container">
    <div class="major clearfix">
      <!-- 焦点轮播图模块 focus-->
      <div class="focus">
        <div class="swiper-container" id="focus-swiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(carousel, index) in bannerList"
              :key="carousel.id"
            >
              <img :src="carousel.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <!-- 新闻快报模块 newsflash-->
      <div class="newsflash">
        <!-- 新闻快报第一部分news -->
        <div class="news">
          <div class="news-hd">
            <h5>热点快报</h5>
            <a href="#">更多<i class="iconfont">&#xe658;</i></a>
          </div>
          <div class="news-bd">
            <ul>
              <li>
                <a href="#"
                  ><span>HOT</span>宝藏小家电推荐，迷你饮水机让你实现喝水自由</a
                >
              </li>
              <li>
                <a href="#"
                  ><span>推荐</span
                  >平价且高品质的居家拖鞋！穿随拖鞋让你感受潮流的温度</a
                >
              </li>
              <li>
                <a href="#"
                  ><span>热议</span
                  >惠而浦610L大容量家用冰箱，守护食材原有新鲜</a
                >
              </li>
              <li>
                <a href="#"
                  ><span>热评</span>用新秀丽双肩背包，做“型”走城市的潮男</a
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- 新闻快报第二部分 lifeservice-->
        <div class="lifeservice">
          <ul>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
            <li>
              <a href="#"
                ><i></i>
                <p>话费</p>
              </a>
            </li>
          </ul>
        </div>
        <!-- 新闻快报第三部分 bargain -->
        <div class="bargain">
          <img src="./images/bargain.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
// 引入mapState辅助函数
import { mapState } from "vuex";
export default {
  name: "",
  mounted() {
    this.$store.dispatch("getBannerList");
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
  watch: {
    // 对象形式写法：监听bannerList的数据变化
    bannerList: {
      handler(newValue, oldValue) {
        // 直接初始化，v-for遍历的页面结构不一定完成渲染，真实DOM不一定加载完成
        // nextTick：在下次DOM更新 循环结束之后 执行延迟回调。在修改数据之后 立即使用这个方法，获取更新后的DOM
        this.$nextTick(() => {
          var mySwiper = new Swiper("#focus-swiper", {
            loop: true, // 循环模式选项
            // 让轮播图自动循环播放
            speed: 150,
            autoplay: {
              delay: "3000"
            },

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // 是否可以点击
	            clickable :true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 控制轮播图切换效果
            // effect: 'fade'
          });

          //鼠标覆盖停止自动切换
          mySwiper.el.onmouseover = function(){
            mySwiper.autoplay.stop();
          }

          //鼠标离开开始自动切换
          mySwiper.el.onmouseout = function(){
            mySwiper.autoplay.start();
          }
        });
      },
    },
  },
};
</script>

<style scoped>
/* 首页专有的模块 */
.list-container {
  width: 1200px;
  margin: 0 auto;
}
/* major主体模块样式 */
.list-container .major {
  /* position: relative;
  margin: 5px 0 0 220px; */
  padding-left: 220px;
  /* width: 980px; */
  height: 465px;
  /* background-color: #f4f4f4; */
}
/* 首页焦点轮播图focus */
.major .focus {
  float: left;
  /* box-sizing: border-box; */
  padding-top: 5px;
  width: 722px;
  height: 100%;
  overflow: hidden;
}
/* swiper轮播图插件类名 */
.focus .swiper-container {
  height: 460px;
  overflow: hidden;
}
.focus img {
  height: 100%;
  width: 722px;
}
.swiper-button-next {
  left: 688px;
  right: auto;
}
.swiper-container .swiper-pagination {
  left: 329px;
  width: 64px;
}
/* 新闻快报newsflash */
.major .newsflash {
  padding-top: 5px;
  float: right;
  width: 242px;
  height: 465px;
}
/* 新闻快报第一部分news */
.newsflash .news {
  height: 165px;
  width: 242px;
  border: 1px solid #e4e4e4;
  background-color: #fff;
}
/* news的标题部分 */
.news-hd {
  height: 33px;
  line-height: 33px;
  border-bottom: 1px dotted #e4e4e4;
}
.news-hd h5 {
  float: left;
  margin-left: 5px;
  font-size: 14px;
}
.news-hd a {
  float: right;
  margin-right: 5px;
}
.news-hd a .iconfont {
  font-size: 12px;
}
/* news的主体部分 */
.news-bd ul {
  margin: 0 10px;
}
.news-bd ul li {
  max-width: 210px;
  height: 24px;
  line-height: 24px;
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.news-bd ul li span {
  display: inline-block;
  margin-right: 4px;
  height: 16px;
  line-height: 16px;
  width: 30px;
  color: #e1251b;
  text-align: center;
  background-color: rgba(225, 37, 27, 0.08);
}
/* 生活服务模块 lifeservice */
.newsflash .lifeservice {
  height: 209px;
  overflow: hidden;
  border: 1px solid #e4e4e4;
  border-top: 0;
  background-color: #fff;
}
.lifeservice ul {
  width: 246px;
}
.lifeservice ul li {
  float: left;
  width: 60px;
  height: 69px;
  text-align: center;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}
.lifeservice ul li a {
  float: left;
  padding-top: 12px;
  width: 60px;
  height: 69px;
}
.lifeservice li a i {
  display: inline-block;
  width: 24px;
  height: 28px;
  background: url(./images/icons.png) no-repeat -17px -15px;
}
/* 特价商品 bargain */
.newsflash .bargain {
  margin-top: 10px;
  height: 75px;
  width: 242px;
}
.bargain img {
  height: 75px;
  width: 242px;
}
</style>