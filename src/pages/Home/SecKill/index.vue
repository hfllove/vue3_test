<template>
  <div class="seckill">
    <div class="container">
      <!-- 秒杀开头模块 -->
      <a href="javascript:;" class="seckill-countdown">
        <div class="countdown-title">乐购秒杀</div>
      </a>
      <!-- 秒杀中间模块 -->
      <div class="seckill-list">
        <div class="swiper-container" id="seckill-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(s1,index) in seckillList" :key="index">
              <a href="javascript:;" v-for="(s2,index) in s1.seckill_items" :key="s2.id">
                <div class="laying-img">
                <img :src="s2.imgUrl" alt="" />
                </div>
                <h6>
                  {{s2.seckill_name}}
                </h6>
                <div class="seckill-item__price">
                  <span class="price-origin">
                    <i>¥</i><span>{{s2.seckill_price}}</span>
                  </span>
                </div>
              </a>    
            </div>
          </div>
          <div class="swiper-button-prev slider_control">
            <i class="iconfont">&#xe656;</i>
          </div>
          <div class="swiper-button-next slider_control">
            <i class="iconfont">&#xe657;</i>
          </div>
        </div>
      </div>
      <!-- 秒杀结尾模块 -->
      <div class="seckill-brand">
        <a href="javascript:;" class="brand-item">
          <div class="item-image">
            <img src="./images/pingleimiaosha.webp" alt="" />
          </div>
          <div class="item-info">
            <p class="item-info-title">厨房卫浴秒杀专场</p>
            <p class="item-info-promo">低至9.9元</p>
            <div class="item-info-action">
              品类秒杀<i class="iconfont"></i>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper"
import {mapState} from 'vuex'
export default {
  name: "",
  mounted () {
    this.$store.dispatch("getSeckillsList");
  },
  computed: {
    ...mapState({
      seckillList: (state) => state.home.seckillList
    })
  },
  watch: {
    seckillList: {
      handler (newValue,oldValue) {
        this.$nextTick(()=> {
          var mySwiper = new Swiper("#seckill-swiper",{
            loop: true, // 循环模式选项
            speed: 600,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          })
        })
      }
    }
  }
};
</script>

<style scoped>
/* xx秒杀模块 */
.seckill {
    margin: 30px 0 20px 0;
    height: 260px;
    /* background-color: #fff; */
}
/* 秒杀模块标题 seckill-countdown */
.seckill .container {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
}
.seckill-countdown{
    display: block;
    float: left;
    width: 200px;
    height: 260px;
    background-color: #e83623;
    background-image: url(./images/seckill-countdown.png);
    background-repeat: no-repeat;
    /* 单独设置背景图片的宽高 */
    background-size: 200px 260px;
}
.countdown-title {
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-top: 31px;
    color: #fff;
}
/* 秒杀商品列表 seckill-list */
.seckill-list {
    float: left;
    width: 800px;
    height: 260px;
}
/* slider 部分*/
/* .seckill-list .swiper-wrapper {
  width: 800px;
  height: 260px;
} */
.seckill-list .swiper-container {
    height: 260px;
    --swiper-navigation-size: 0px;/* 设置按钮大小 */
}
/* 前进后退按钮设置 */
.seckill-list .swiper-container .swiper-button-prev {
  left: 0;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}
.seckill-list .swiper-container .swiper-button-next {
  right: 0;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}
.seckill-list .slider_control {
  position: absolute;
    top: 50%;
    border-radius: 0;
    width: 25px;
    height: 35px;
    line-height: 35px;
    background-color: rgba(0,0,0,.15);
    margin-top: -20px;
    z-index: 2;
    border: none;
    outline: none;
    -webkit-transition: background-color .2s ease;
    transition: background-color .2s ease;
}
/* 设置前进后退按钮的鼠标hover样式 */
.seckill-list .slider_control:hover {
  background-color: rgba(0,0,0,.3);
}
/* 设置前进后退按钮中的字体图标样式 */
.seckill-list .slider_control i {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    color: rgba(255,255,255,.8);
    font-size: 18px;
}
.seckill-list .swiper-container .swiper-button-prev i {
  left: 3px;
}
.seckill-list .swiper-container .swiper-button-next i {
  right: -4px;
}
.seckill-list a {
    display: block;
    position: relative;
    float: left;
    height: 260px;
    width: 200px;
}
.seckill-list a::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 1px;
    height: 200px;
    background:linear-gradient(180deg,white,#eeeeee,white);
}
.seckill-list a .laying-img {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    width: 140px;
    height: 140px;
}
.laying-img img {
    width: 100%;
    height: 100%;
}
/* 鼠标放到a标签上的效果 */
.seckill-list a h6 {
    margin-top: 10px;
    margin-left: 30px;
    max-width: 160px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.seckill-list a:hover h6 {
    color: #c81623;
}
.seckill-list a:hover .laying-img {
  opacity: 0.7;
}
.seckill-list .seckill-item__price {
    margin: 7px 20px 0;
    text-align: center;
    color: #e1251b;
    font-weight: 700;
}
/* seckill-brand 模块 */
.seckill-brand {
    float: left;
    width: 200px;
    height: 260px;
    padding: 10px;
}
.brand-item {
    display: block;
}
.brand-item .item-image {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 120px;
    height: 120px;
}
.item-image img {
    width: 120px;
}
.item-info {
    margin-top: 10px;
    width: 100%;
    height: 90px;
    text-align: center;
    font-size: 14px;
    background: linear-gradient(180deg,rgba(255,255,255,.5),rgba(220,224,236,.5));
}
.item-info .item-info-title {
    color: #666;
}
.item-info .item-info-promo {
    color: #333;
    font-weight: 700;
}
.item-info .item-info-action {
    display: inline-block;
    margin-top: 6px;
    width: 82px;
    height: 24px;
    padding-left: 8px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: #e1251b;
    /* background-color: pink; */
    border: 1px solid #e1251b;
    border-radius: 14px;
}
.item-info-action .iconfont {
    font-size: 12px;
}
.item-info-action:hover {
    background: #e1251b;
    color: #fff;
}
/* 秒杀模块中间部分的控制按钮 button */
/* 左右按钮共用样式 */
.seckill-list .slider button {
    position:absolute;
    top: 50%; 
    /* margin-top: -15px; */
    /* 用2d转换给盒子进行垂直居中 */
    transform: translateY(-50%);
    width: 25px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-radius: 0;
    /* 提高优先级 */
    z-index: 2;
    background-color: #d9d9d9;
}
/* 箭头共用样式 */
.seckill-list .slider button .iconfont {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    color: #f9f9f9;
}
/* 左边箭头 */
.seckill-list .slider .seckill-prev {
    left: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
.seckill-list .seckill-prev .iconfont {
    margin-left: -3px;
}
/* 右边箭头 */
.seckill-list .slider .seckill-next {
    right: 0;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.seckill-list .seckill-next .iconfont {
    margin-right: -3px;
}
</style>