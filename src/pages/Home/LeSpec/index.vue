<template>
  <div class="le-spec">
    <div class="container">
      <!-- 天天特价部分  -->
      <div class="spec_offer">
        <div class="box_hd">
          <a href="javascript:;" class="box_hd_lk">
            <h3 class="box_tit">每日特价</h3>
            <!-- arrow 箭头 -->
            <i class="box_hd_arrow"></i>
          </a>
        </div>
        <div class="box_bd">
          <div class="special_inner" v-for="(s1,index) in lespecList" :key="index">
            <div class="special_tab" >
              <div class="tab_head">
                <div class="tab_head_item" id="_item1" v-for="(s2,index) in s1.lespecItem" :key="s2.id" @mouseenter="changeIndex(index)" :class="{ active: currentIndex == index }">
                  <a href="javascript:;" class="special_tab_lk" >{{s2.name}}</a>
                </div>
              </div>
              <div class="tab_body" :style="{ display : currentIndex == index ? 'block' : 'none'}" v-for="(s2,index) in s1.lespecItem" :key="index+'les'">
                <div class="tab_body_item2">
                  <div class="special_list">
                    <div class="special_item special_item_0" v-for="(firstItems,index) in s2.lesItem" :key="firstItems.lesItemId" >
                      <a href="javascript:;" class="special_item_lk" >
                        <div class="special_item_img">
                          <img :src="firstItems.imgFirstUrl" alt="" />
                        </div>
                        <div class="special_item_lowestFirst">{{firstItems.lowestFirst}}</div>
                        <div class="special_item_message">
                          <span class="special_item_name"
                            >{{firstItems.messageFirst}}</span
                          >
                          <div class="special_item_price">
                            <span class="special_item_miaoShaPrice">
                              <span class="dollar_txt">￥</span>{{firstItems.priceFirst}}
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="special_item special_item_1" v-for="(s3,index) in s2.specItem" :key="index+'spec'" >
                      <a href="javascript:;" class="special_item_lk">
                        <div class="special_item_img">
                          <img :src="s3.itemImgUrl" alt="" />
                        </div>
                        <div class="special_item_lowest">{{s3.itemLowest}}</div>
                        <div class="special_item_message">
                          <span class="special_item_name"
                            >{{s3.itemMessage}}</span
                          >
                          <div class="special_item_price">
                            <span class="special_item_miaoShaPrice">
                              <span class="dollar_txt">￥</span>{{s3.itemPrice}}
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 品牌闪购部分 -->
      <div class="spec_lightning">
        <div class="box_hd">
          <a href="javascript:;" class="box_hd_lk">
            <h3 class="box_tit">品牌闪购</h3>
            <!-- arrow 箭头 -->
            <i class="box_hd_arrow"></i>
          </a>
        </div>
        <div class="box_bd">
          <div class="lighting-buy">
            <!-- goods_core 焦点商品 -->
            <a href="javascript:;" class="goods_core">
              <img src="./images/qianzaiyiyu.webp" alt="" class="core_logo" />
              <h6 class="core_name">千载一玉珠宝闪购</h6>
              <div class="core_desc">
                <span class="core_desc_promo">领劵+白条免息</span>
                <span class="core_desc_extra">
                  <span class="extra_txt">仅剩</span>
                  <div class="extra-day">
                    <span>2</span>
                    天
                  </div>
                </span>
              </div>
              <img src="./images/img_core_goods.webp" alt="" class="core_goods" />
            </a>
            <!-- 其他商品、品牌 -->
            <div class="goods-others">
              <a href="javascript:;" class="other_item">
                <div class="other_item_logo">
                  <img src="./images/bosideng.webp" alt="" />
                </div>
                <h6 class="other_item_name">波司登品牌闪购</h6>
              </a>
              <a href="javascript:;" class="other_item">
                <div class="other_item_logo">
                  <img src="./images/bosideng.webp" alt="" />
                </div>
                <h6 class="other_item_name">波司登品牌闪购</h6>
              </a>
              <a href="javascript:;" class="other_item">
                <div class="other_item_logo">
                  <img src="./images/bosideng.webp" alt="" />
                </div>
                <h6 class="other_item_name">波司登品牌闪购</h6>
              </a>
              <a href="javascript:;" class="other_item">
                <div class="other_item_logo">
                  <img src="./images/bosideng.webp" alt="" />
                </div>
                <h6 class="other_item_name">波司登品牌闪购</h6>
              </a>
              <a href="javascript:;" class="other_item">
                <div class="other_item_logo">
                  <img src="./images/bosideng.webp" alt="" />
                </div>
                <h6 class="other_item_name">波司登品牌闪购</h6>
              </a>
              <a href="javascript:;" class="other_item">
                <div class="other_item_logo">
                  <img src="./images/bosideng.webp" alt="" />
                </div>
                <h6 class="other_item_name">波司登品牌闪购</h6>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "",
  data () {
    return {
      currentIndex: 0,
      aStyle: false
    }
  },
  mounted () {
    this.$store.dispatch('getLespecList')
  },
  methods: {
    changeIndex (index) {
      this.currentIndex = index
    },
    // 当鼠标移入a链接标签时，图片透明度降低，字体颜色变红
    enterStyle () {
      this.aStyle = true
    },
    leaveStyle () {
      this.aStyle = false
    }
  },
  computed: {
    ...mapState({
      lespecList: (state) => state.home.lespecList
    })
  },
};
</script>

<style scoped>
/* ————乐购特价模块———— */
.le-spec {
    height: 340px;
    margin-bottom: 20px;  
}
.le-spec .container {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}
/* ——天天特价部分—— */
.spec_offer {
    float: left;
    width: 590px;
    height: 340px;
    margin: 0 10px 0 0;
    background-color: #fff;
}
.le-spec .box_hd {
    height: 60px;
    padding: 0 20px;
}
.le-spec .box_hd_lk {
    display: inline-block;
    height: 32px;
    margin: 12px 0 0;
}
.le-spec .box_tit {
    float: left;
    font-size: 24px;
    font-weight: 700;
    color: #333;
    line-height: 32px;
}
/* 用精灵图加鼠标悬浮的样式做图标效果 */
.le-spec .box_hd_arrow {
    background: url(./images/sprite.png) no-repeat -16px 0;
    float: left;
    position: relative;
    top: 9px;
    left: 10px;
    width: 16px;
    height: 16px;
}
.le-spec .box_hd_arrow::after {
    content: "";
    background: url(./images/sprite.png) no-repeat 0 0;
    float: left;
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    visibility:hidden;
    transition: all .2s ease;
}
.le-spec .box_hd_arrow:hover::after {
    visibility: visible;
}
/* box_hd部分 */
.le-spec .special_inner {
    padding: 0 15px 15px;
}
.le-spec .special_tab {
    position: relative;
}
/* ----- 每日特价内容版块标题 ----- */
.le-spec .tab_head {
    position: absolute;
    right: 0;
    bottom: 108%;
    cursor: default;
}
.le-spec .tab_head_item {
    display: inline-block;
    padding: 0 13.5px;
}
/* 动态给tab标题添加样式 start */
.active {
  position: relative;
}
.active a {
  color: #e1251b;  
}
.active::after {
  position: absolute;
  content: '';
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 2px;
  background-color: #e1251b;
}
/* 动态给tab标题添加样式 end */
.special_item_lk {
    display: inline-block;
    cursor: pointer;
    font-size: 14px;
    font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
    color: #999;
    line-height: 19px;
    padding-bottom: 2px;
}
/* 鼠标放到a标签上的效果 */
.special_item_lk:hover .special_item_img {
  opacity: 0.7;
}
.special_item_lk:hover .special_item_name {
  color: #e1251b;
}
.tab_body_item {
    width: 560px;
    height: 270px;
}
.special_list {
    width: 560px;
    height: 270px;
    display: inline-block;
}

/* 共用的样式 开始*/
.special_item {
    display: inline-block;
    vertical-align: top;
    width: 170px;
    height: 89px;
}
.special_item_lk {
    display: inline-block;
    position: relative;
    width: 170px;
}
/* .special_item_lk::after {
    content: "";
    display: block;
    clear: both;
} */
.special_item_img {
    float: left; 
    width: 84px;
    height: 84px;
}
.special_item_message {
    float: left;
    width: 75px;
    margin-left: 6px;
}
.special_item_name {
    display: inline-block;
    width: 100%;
    color: #333;
    height: 32px;
    font-size: 12px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
}
.special_item_img:hover img {
    opacity: 0.8;
}
.special_item_lowestFirst {
    display: inline-block;
    width: 90px;
    height: 24px;
    position: absolute;
    left: 0;
    background-position: 50%;
    background-image:url(./images/xiazai.png);
    background-size: cover;
    font-family: MicrosoftYaHei-Bold,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
    font-weight: 700;
    font-size: 12px;
    line-height: 24px;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
}
.special_item_miaoShaPrice {
    display: inline-block;
    font-size: 14px;
    line-height: 16px;
    font-family: Arial-BoldMT,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
    color: #e1251b;
    letter-spacing: 0;
    margin-top: 5px;
    font-weight: 700;
}
.special_item_name:hover {
    color: #c81623;
}
.dollar_txt {
    font-size: 12px;
}
/* 共用样式结束 */
/* special_item_0 */
.special_item_0 {
    background-color: rgba(109,126,146,.05);
    margin-right: 6px;
    float: left;
    width: 170px;
    height: 265px;
    vertical-align: bottom;
}
.special_item_0 .special_item_img {
    /* position: absolute; */
    margin-left: 24px;
    margin-top: 46px;
    width: 120px;
    /* left: 50%; */
    height: 120px;
    display: inline-block;
    text-align: center;
}
.special_item_0 .special_item_img img {
    width: 100%;
    height: 100%;
}
.special_item_0 .special_item_message {
    margin-left: 0;
    width: 100%;
    text-align: center;
}
.special_item_0 .special_item_name {
    display: inline-block;
    margin-top: 9px;
    margin-bottom: 4px;
    text-align: center;
    width: 150px;
    height: 19px;
    line-height: 19px;
    font-size: 14px;
}
.special_item_0 .special_item_price {
    margin-top: 4px;
}
.special_item_0 .special_item_miaoShaPrice {
    margin: 0 2px;
    display: inline;
    font-size: 18px;
}
/* special_item_1,special_item_2 */
.special_item_1 .special_item_img {
    float:left;
    height: 84px;
    width: 84px;
}
.special_item_1 .special_item_img img {
    width: 100%;
    height: 100%;
}
.special_item_lk .special_item_lowest {
    display: inline-block;
    width: 84px;
    height: 16px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
    color: #fff;
    text-align: center;
    line-height: 16px;
    overflow: hidden;
    white-space: nowrap;
    font-size: 11px;
}
/* 已抢商品数量 */
.special_item_message .special_item_soldMsg {
    display: inline-block;
    margin-top: 14px;
    font-size: 12px;
    line-height: 16px;
    position: absolute;
    color: #999;
}
.special_item_soldNum {
    color: #e1251b;
}
.special_item_1 {
    margin-top: 18px;
    margin-left: 19px;
    margin-bottom: 48px;
}

/* 每日特价内容标题a标签 */
.special_tab_lk {
    display: inline-block;
    font-size: 14px;
    font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
    line-height: 19px;
    padding-bottom: 2px;
}
/* ——品牌闪购部分—— */
.spec_lightning {
    float: left;
    margin: 0 0 0 10px;
    width: 590px;
    height: 340px;
    background-color: #fff;
}
/* 调盒子内部间距的 */
.lighting-buy {
    padding: 0 10px 0 15px;
}
/* 商品焦点 */
.lighting-buy .goods_core {
    position: relative;
    display: inline-block;
    margin-right: 7px;
    width: 270px;
    height: 265px;
}
/* 用伪元素和linear—gradient线性渐变属性来给盒子添加背景色 */
.lighting-buy .goods_core::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content:"";
    z-index: 2;
    background: linear-gradient(180deg,rgba(161,215,152,.05),rgba(31,102,26,.05));
}
/* core-logo */
.goods_core .core_logo {
    display: block;
    margin: 15px auto 0;
    width: 70px;
    height: 35px;
    z-index: 1;
}
.goods_core .core_name {
    margin-top: 6px;
    text-align: center;
    font-size: 16px;
    color: #333;
}
.goods_core .core_desc {
    margin-top: 1px;
    margin-bottom: 13px;
    text-align: center;
    color: #666;
    z-index: 1;
}
.goods_core .core_goods {
    display: block;
    width: 130px;
    height: 130px;
    margin: 0 auto;

}
.core_desc .core_desc_promo {
    padding-right: 5px;
}
.core_desc .core_desc_extra {
    position: relative;
    padding-left: 5px;
}
.core_desc .core_desc_extra::before {
    position: absolute;
    content:"";
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 1px;
    height: 10px;
    background-color: rgba(102,102,102,.4);
}
.core_desc_extra .extra-txt {
    margin-right: 4px;
}
/* 把块级盒子变成行内块的形式 */
.core_desc_extra .extra-day {
    display: inline-block;
}
/* 给关键数字加粗显示 */
.core_desc_extra .extra-day span {
    font-weight: 700;
}
/* 其他商品，品牌 */
.lighting-buy .goods-others {
    display: inline-block;
    width: 274px;
    margin-top: -40px;
    vertical-align: top;
}
.goods-others .other_item {
    display: inline-block;
    width: 135px;
    height: 100px;
    padding: 14px 0 14px 0 ;
    text-align: center;
    overflow: hidden;
    box-sizing: border-box;
}
.other_item .other_item_logo {
    margin: 0 auto;
    width: 100px;
    height: 50px;
}
.other_item .other_item_name {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666;
}
.other_item_logo img {
    width: 100%;
    height: 100%;
}
/* 给品牌标签添加一个鼠标悬浮的半透明效果 */
.goods-others .other_item:hover {
    opacity: 0.7;
}
/* 给品牌标签添加分隔符 */
.goods-others .other_item:nth-child(2n-1)::after {
    position: absolute;
    margin-top: -30px;
    right: 0;
    top: 50%;
    content: "";
    width: 1px;
    height: 60px;
    background: linear-gradient(180deg,white,#eeeeee,#eeeeee,white);
}
</style>