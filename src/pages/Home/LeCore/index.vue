<template>
  <div class="le-core">
    <div class="container">
      <!-- 新品首发部分 -->
      <div class="box newArrival">
        <div class="box_hd">
          <a href="javascript:;" class="box_hd_lk">
            <h3 class="box_tit">新品首发</h3>
            <i class="box_hd_arrow"></i>
          </a>
        </div>
        <div class="box-bd" style="overflow: hidden;">
          <div class="slider newArrival_slider" style="overflow: initial;">
            <button class="slider_control slider_control_prev"><i class="iconfont">&#xe656;</i></button>
            <!-- 定位用的大盒子 -->
            <div class="slider_list">
              <!-- 图片列表 -->
              <div class="slider_wrapper">
                <div class="slider_item newArrival_item" v-for="(newarrivalItem,index) in newarrivalList" :key="newarrivalItem.id">
                  <a href="javascript:;" class="newArrival_item_lk" @mouseenter="enterStyle(index)" @mouseleave="leaveStyle">
                    <div class="lazyimg lazyimg_loaded newArrival_item_img" :style="{opacity: currentStyle==index?'0.7': '1'}">
                      <img :src="newarrivalItem.imgUrl" />
                    </div>
                    <div class="newArrival_item_msg">
                      <p class="newArrival_item_name" :style="{color: currentStyle==index?'#e1251b':'inherit'}">
                        {{newarrivalItem.name}}
                      </p>
                      <p class="newArrival_item_desc">来这里发现更多新品</p>
                      <p class="newArrival_item_price">
                        <span class="dollar_txt">￥</span>
                        {{newarrivalItem.price}}
                        <span style="font-size: 16px">起</span>
                      </p>
                      <div class="newArrival_item_new">NEW</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <button class="slider_control slider_control_next"><i class="iconfont">&#xe657;</i></button>
          </div>
        </div>
      </div>
      <div class="box new_top">
        <div class="box_hd">
          <a href="javascript:;" class="box_hd_lk">
            <h3 class="box_tit">JOY 寻宝</h3>
            <i class="box_hd_arrow"></i>
          </a>
        </div>
        <div class="box-bd">
          <div class="top_inner">
            <div class="top_tab tab" v-for="(j1,index) in joyfindList" :key="j1.id">
              <div class="tab_head">
                <div class="tab_head_item" @mouseenter="changeIndex(index)" v-for="(j2,index) in j1.joyItem" :key="j2.id">
                  <a href="javascript:;" class="top_tab_lk" :class="{ active: currentIndex == index}">{{j2.name}}</a>
                </div>
              </div>
              <div class="tab_body" >
                <div class="tab_body-item" v-for="(j2,index) in j1.joyItem" :key="index" :style="{display: currentIndex == index ? 'block': 'none' }">
                  <div class="new_joy_list">
                    <div class="joy_item" v-for="(j3,index) in j2.joygoodItem" :key="j3.id">
                      <a
                        href="javascript:;"
                        class="joy_item_lk"
                      >
                        <div class="lazyimg lazyimg_loaded joy_item_img">
                          <img :src="j3.imgUrl" alt="" />
                        </div>
                        <div class="joy_item_info">
                          <span class="joy_item_name">
                            {{j3.joygoodName}}
                          </span>
                          <div class="joy_item_price">
                            <span>
                              <i>¥</i><span class="joy_item_price_txt">{{j3.joygoodPrice}}<span class="joy_item_price_txt-decimal">{{j3.joygoodDecimal}}</span>
                              </span>
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
      <div class="box nice-shop">
        <div class="box_hd">
          <a href="javascript:;" class="box_hd_lk">
            <h3 class="box_tit">逛好店</h3>
            <i class="box_hd_arrow"></i>
          </a>
        </div>
        <div class="box-bd">
          <div class="nice-shop__container">
            <a href="" class="shop-item shop-item--bg6">
              <div class="shop-item_info">
                <div class="item-title">惠氏（Wyeth）京东自营官方旗舰店</div>
                <div class="item-tags">
                  <span class="text-tag text-tag--origin">自营</span>
                  <span class="text-tag text-tag--theme">育儿心经</span>
                </div>
                <div class="item-social">987.4万人关注</div>
              </div>
              <div class="shop-item__cover">
                <img src="./images/naifen.jpg" alt="" />
              </div>
            </a>
            <a href="" class="shop-item shop-item--bg8">
              <div class="shop-item_info">
                <div class="item-title">丝塔芙京东自营官方旗舰店</div>
                <div class="item-tags">
                  <span class="text-tag text-tag--origin">自营</span>
                  <span class="text-tag text-tag--theme">美颜出镜</span>
                </div>
                <div class="item-social">180.8万人关注</div>
              </div>
              <div class="shop-item__cover">
                <img src="./images/tushu.jpg" alt="" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="box coupon box_last">
        <div class="box_hd">
          <a href="javascript:;" class="box_hd_lk">
            <h3 class="box_tit">领劵中心</h3>
            <i class="box_hd_arrow"></i>
          </a>
        </div>
        <div class="box_bd">
          <div class="coupon_inner">
            <div class="coupon_list">
              <div class="coupon_item coupon_item_1">
                <a href="javascript:;" class="coupon_lk">
                  <div class="coupon_lk_wrap">
                    <div class="coupon_img lazyimg lazyimg_loaded">
                      <img
                        src="./images/zibupin.jpg"
                        alt=""
                        class="lazyimg_img"
                      />
                    </div>
                    <div class="coupon_info">
                      <div class="mod_price coupon_price">
                        <i>¥</i>
                        <span>10</span>
                      </div>
                      <div class="coupon_limit">满11元可用</div>
                      <div class="coupon_desc">
                        传统滋补品类新客专享(部分商品可用)
                      </div>
                    </div>
                  </div>
                  <div class="coupon_more">
                    <div class="coupon_more_inner">更多好劵</div>
                    <div class="coupon_more_arrow"></div>
                  </div>
                </a>
              </div>
              <div class="coupon_item coupon_item_2">
                <a href="javascript:;" class="coupon_lk">
                  <div class="coupon_lk_wrap">
                    <div class="coupon_img lazyimg lazyimg_loaded">
                      <img src="./images/huixun.jpg" alt="" class="lazyimg_img" />
                    </div>
                    <div class="coupon_info">
                      <div class="mod_price coupon_price">
                        <i>¥</i>
                        <span>2</span>
                      </div>
                      <div class="coupon_limit">满5元可用</div>
                      <div class="coupon_desc">
                        仅可购买惠寻等部分商品(部分商品可用)
                      </div>
                    </div>
                  </div>
                  <div class="coupon_more">
                    <div class="coupon_more_inner">更多好劵</div>
                    <div class="coupon_more_arrow"></div>
                  </div>
                </a>
              </div>
              <div class="coupon_item coupon_item_last">
                <a href="javascript:;" class="coupon_lk">
                  <div class="coupon_lk_wrap">
                    <div class="coupon_img lazyimg lazyimg_loaded">
                      <img
                        src="./images/zibupin.jpg"
                        alt=""
                        class="lazyimg_img"
                      />
                    </div>
                    <div class="coupon_info">
                      <div class="mod_price coupon_price">
                        <i>¥</i>
                        <span>10</span>
                      </div>
                      <div class="coupon_limit">满11元可用</div>
                      <div class="coupon_desc">
                        传统滋补品类新客专享(部分商品可用)
                      </div>
                    </div>
                  </div>
                  <div class="coupon_more">
                    <div class="coupon_more_inner">更多好劵</div>
                    <div class="coupon_more_arrow"></div>
                  </div>
                </a>
              </div>
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
      currentStyle: -1,
    }
  },
  mounted () {
    this.$store.dispatch('getJoyFindList')
    this.$store.dispatch('getNewArrivalList')
  },
  computed: {
    ...mapState({
      joyfindList: (state) => state.home.joyfindList,
      newarrivalList: (state) => state.home.newarrivalList
    })
  },
  watch: {
    newarrivalList: {
      handler(newValue,oldValue) {
        this.$nextTick(()=>{
          this.newArrivalMove()
        })
      }
    }
  },
  methods: {
    changeIndex (index) {
      this.currentIndex = index
    },
    enterStyle (index) {
      this.currentStyle = index
    },
    leaveStyle () {
      this.currentStyle = -1
    },
    newArrivalMove () {
      // 获取newArrival元素
    var newArrival = document.querySelector('.newArrival_slider .slider_wrapper')
    // console.log(newArrival+"####newArrival")

    // 获取newArrival的所有子元素数组
    var arrivalItem = newArrival.children
    // 获取newArrival的单个子元素的宽度
    var arriItemWidth = arrivalItem[0].clientWidth
    // console.log(arriItemWidth+"######arriItemWidth")
    // 子元素的个数
    var arriLength = arrivalItem.length
    // console.log("arriLength:"+arriLength)
    // 设置newArrival的left值
    newArrival.style.left = - 65 + "px"
    // 设置newArrival的width值
    newArrival.style.width = arriItemWidth * arriLength + "px"
    // 设置newArrival的position值
    newArrival.style.position = "relative"

    // // 设置newArrival的transform值
    newArrival.style.transform = "translate3d(-" + 390 + "px,0,0)"

    // console.log(item_moving+"####item_moving")
    // 获取当前的newArrival的transform值
    var transX = document.defaultView.getComputedStyle(newArrival,null).transform
    // console.log('transX:'+transX.split(',')[4]);
    var curr_New = parseInt(transX.split(',')[4])
    // console.log('curr_New:'+curr_New);
    
    // 定义初始化数组标识
    var num_flag = 1

    // 创建一个自定义数组
    let numIndex = ['-3','-2','-1','0','1','2','3','4','5','6']
    // 给元素添加自定义属性
    for(var i= 0;i< arriLength;i++){
        arrivalItem[i].setAttribute ('data-index',numIndex[i])
    }

    // var arrivalIndex = arrivalItem[num_flag+3].getAttribute('data-index')
    arrivalItem[num_flag+3].style.transform = "scale(1.0)" 
    // console.log(arrivalItem[num_flag].childNodes[0].children[1].style.opacity)
    arrivalItem[num_flag+3].childNodes[0].children[1].style.opacity = "1"
    
    /*
      定义一个控制图片列表自动循环的函数
    */
    var timeId = setTimeout(nextNewArrival,5000)

    function nextNewArrival () {
        clearTimeout(timeId)
        if(num_flag === 5) {
            num_flag = 1
            // 跳转到循环图片的第一个位置
            newArrival.style.transform = "translate3d(" + curr_New + "px,0,0)" 
            // 给当前位置图片设置缩放
            arrivalItem[num_flag+3].style.transform = "scale(1.0)"
            arrivalItem[num_flag+3].style.transition = "none"


            // 循环图片的最后一个位置设置恢复原样
            arrivalItem[num_flag+7].style.transform = "scale(0.8)"
            arrivalItem[num_flag+7].childNodes[0].children[1].style.opacity= "0"
            arrivalItem[num_flag+7].style.transition = "transform 0.5s ease-in-out"

            newArrival.style.transition = "none"
            timeId = setTimeout(nextNewArrival,5000)
        }else {
            // 当前的图片 要缩小、移动
            arrivalItem[num_flag+3].style.transform = "scale(.8)"
            arrivalItem[num_flag+3].childNodes[0].children[1].style.opacity="0"
            arrivalItem[num_flag+3].style.transition = "transform 0.5s ease-in-out"
            // 下一个图片 要放大、移动
            arrivalItem[num_flag+4].style.transform = "scale(1.0)"
            arrivalItem[num_flag+4].childNodes[0].children[1].style.opacity="1"
            arrivalItem[num_flag+4].style.transition = "transform 0.5s ease-in-out"
            num_flag ++
            // 图片列表进行移动动画 
            newArrival.style.transform = "translate3d(" + (curr_New-(num_flag-1)*arriItemWidth) + "px,0,0)";  
            newArrival.style.transition = "transform 0.5s ease-in-out"
            // console.log('arrivalItem:'+arrivalItem[num_flag+3].getAttribute('data-index'));
            // 如果当前图片到了循环图片的最后一个位置
            if(arrivalItem[num_flag+3].getAttribute('data-index') == 5 ){
                // 设置循环图片的第一个位置文字的显示与隐藏属性
                arrivalItem[num_flag-1].childNodes[0].children[1].style.opacity = "1"
                // 控制图片列表最后一张图跳到第一张的定时器
                timeId = setTimeout(nextNewArrival,500)
                // console.log('22222222');
            }else{
                // 控制图片列表进行向左移动的定时器
                timeId = setTimeout(nextNewArrival,5000)
            }
        }

    } 

    /*
        给右按钮添加点击事件
    */
    // 获取右按钮
    var nextNewArrivalBtn = document.querySelector('.newArrival_slider .slider_control_next')
    nextNewArrivalBtn.onclick = function () {
       clearTimeout(timeId)
       timeId = setTimeout(nextNewArrival,100)
       // console.log('timeId:'+timeId);
    }
// console.log('tiemId2:'+timeId);

    // 设置一个向左的函数 
    function prevNewArrival () {
        clearTimeout(timePrev)
        if(num_flag === 0 ) {
            num_flag = 4
            // 跳转到循环图片的第一个位置
            newArrival.style.transform = "translate3d(" + (curr_New-(num_flag-1)*arriItemWidth) + "px,0,0" 
            // 给当前位置图片设置缩放
            arrivalItem[num_flag+3].style.transform = "scale(1.0)"
            arrivalItem[num_flag+3].style.transition = "none"

            // 循环图片的第一个位置设置恢复原样
            arrivalItem[num_flag-1].style.transform = "scale(0.8)"
            arrivalItem[num_flag-1].childNodes[0].children[1].style.opacity= "0"
            arrivalItem[num_flag-1].style.transition = "transform 0.5s ease-in-out"

            newArrival.style.transition = "none"
        }else {
            // 当前的图片 要缩小、移动
            arrivalItem[num_flag+3].style.transform = "scale(.8)"
            arrivalItem[num_flag+3].childNodes[0].children[1].style.opacity="0"
            arrivalItem[num_flag+3].style.transition = "transform 0.5s ease-in-out"
            // 前面的图片 要放大、移动
            arrivalItem[num_flag+2].style.transform = "scale(1.0)"
            arrivalItem[num_flag+2].childNodes[0].children[1].style.opacity="1"
            arrivalItem[num_flag+2].style.transition = "transform 0.5s ease-in-out"
            num_flag --
            // 图片列表进行移动动画
              newArrival.style.transform = "translate3d(" + (curr_New-(num_flag-1)*arriItemWidth) + "px,0,0"; 
              newArrival.style.transition = "transform 0.5s ease-in-out"
            // // 如果当前图片到了循环图片的第一个位置
            if(arrivalItem[num_flag+3].getAttribute('data-index') == 0){
                // 设置循环图片的最后一个位置文字的显示与隐藏属性
                arrivalItem[num_flag+7].childNodes[0].children[1].style.opacity = "1" 
                timePrev = setTimeout(prevNewArrival,500)   
            }
        }
    }

    // 获取左按钮
    var prevNewArrivalBtn = document.querySelector('.newArrival_slider .slider_control_prev')
    // 给左边按钮事件设置定时器
    var timePrev
    prevNewArrivalBtn.onclick = function () {
        clearTimeout(timeId)
        // console.log('tiemId2:'+timeId);
        prevNewArrival()
        timeId = setTimeout(nextNewArrival,5000)
        // console.log('timePrev:'+timePrev);
    }
    }
  },
};
</script>

<style scoped>
/* ———— le-core 特价优选模块 */
.le-core {
    height: 340px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.le-core .container {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
}
/* 四个box共用样式 */
.le-core .box {
    float: left;
    margin: 0 13px 0 0;
    width: 290px;
    height: 340px;
    background-color: #fff;
}
.le-core .box_hd {
    height: 60px;
    padding: 0 20px;
}
.le-core .box_hd_lk {
    display: inline-block;
    height: 32px;
    margin: 12px 0 0;
}
.le-core .box_tit {
    float: left;
    font-size: 24px;
    font-weight: 700;
    color: #333;
    line-height: 32px;
}
/* 用精灵图加鼠标悬浮的样式做图标效果 */
.le-core .box_hd_arrow {
    background: url(./images/sprite.png) no-repeat -16px 0;
    float: left;
    position: relative;
    top: 9px;
    left: 10px;
    width: 16px;
    height: 16px;
}
.le-core .box_hd_arrow::after {
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
.le-core .box_hd_arrow:hover::after {
    visibility: visible;
}
/* box_hd部分 */
.le-core .special_inner {
    padding: 0 15px 15px;
}
.le-core .special_tab {
    position: relative;
}
/* ----- 给四个box分别设置类名，添加各自的样式 ----- */
.le-core .newArrival {
    background: #fff;
    background-image: url(./images/newArrival_bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
}
.newArrival .newArrival_slider {
    position: relative;
    width: 260px;
    height: 250px;
    margin: 0 auto;
    display: flex;
    /*background-color: #abc;*/
}
/*左右按钮盒子公共样式*/
.newArrival_slider .slider_control {
    position: absolute;
    top: 50%;
    margin-top: -50px;
    height: 35px;
    width: 25px;
    /*transform: translateY(-50%);*/
    line-height: 35px;
    background-color: rgba(0, 0, 0, 0.15);
    font-size: 20px;
    z-index: 2;
    border: none;
    border-radius: 0;
    outline: none;
    transition: background-color .2s ease;
}
.newArrival_slider .slider_control:hover {
    background-color: rgba(0, 0, 0, 0.35);
}
.newArrival_slider .slider_control:hover i {
    color: rgba(255, 255, 255, 0.9);
}
/*左边按钮盒子*/
.newArrival_slider .slider_control_prev {
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    left: -15px;
}
/*右边按钮盒子*/
.newArrival_slider .slider_control_next {
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
    right: -15px;
}
/*按钮图标公共样式*/
.newArrival_slider .slider_control i {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, .7);
    transition: color .2s ease;
}
/*给按钮图标设置抗锯齿，使字体更清晰*/
.iconfont {
    font-family: iconfont,sans-serif;
    font-style: normal;
    -webkit-text-stroke-width: 0.2px;
}
/*左边按钮图标*/
.newArrival_slider .slider_control_prev i {
    left: -3px;
}
.newArrival_slider .slider_control_next i {
    right: -3px;
}
/*图片列表*/
.newArrival_slider .slider_list {
    position: relative;
    height: 250px;
}
.newArrival_slider .slider_item {
    width: 130px;
    float: left;
    height: 100%;
    min-height: 1px;
}
.newArrival_slider .newArrival_item {
    /* transition: all .4s ease; */
    /* 缩小图片的宽高 */
    transform: scale(.8);
    transform-origin: center center;
    text-align: center;
}
.newArrival_item_lk {
    display: block;
    position: relative;
}
/* .newArrival_item_lk:hover .lazyimg {
  opacity: 1;
} */
.newArrival_item_lk .lazyimg_loaded {
    background: transparent;
}
.newArrival_item_lk .lazyimg {
    position: relative;
    overflow: hidden;
}
.lazyimg_loaded {
    opacity: 1;
    transition: opacity .4s ease;
}
.newArrival_item_img img {
    display: inline-block;
    width: 130px;
    height: 130px;
    margin-top: 10px;
}
.newArrival_item_msg {
    transition: opacity .4s ease;
    opacity: 0;
}
.newArrival_item_name {
    position: relative;
    margin-top: 20px;
    margin-bottom: 4px;
    width: 200px;
    left: -24px;
    line-height: 19px;
    font-size: 14px;
    color: #333;
    transition: color .2s ease;
    overflow: hidden;
    /*opacity: 0;*/
    white-space: nowrap;
    text-overflow: ellipsis;
}
.newArrival_item_desc {
    position: relative;
    width: 20px;
    height: 16px;
    left: 14px;
    line-height: 16px;
    letter-spacing: 0;
    font-size: 12px;
    color: #999;
    /*overflow: hidden;
    opacity: 0;*/
    white-space: nowrap;
    text-overflow: ellipsis;
}
.newArrival_item_price {
    margin-top: 20px;
    font-size: 18px;
    color: #e1251b;
    letter-spacing: 0;
}
.dollar_txt {
    font-size: 12px;
}
.newArrival_item_new {
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 0;
    width: 48px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-image: url(./images/newpng.png);
    background-size: cover;
    background-position: 50%;
    color: white;
    /*opacity: 0;*/
    transition: all .4s ease; 
    font-family: Arial-BoldMT,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
}

/* ----- JOY寻宝部分css ----- */
.top_inner .top_tab {
    position: relative;
}
.le-core .tab_head {
    position:absolute;
    height: 40px;
    right: 5px;
    line-height: 0;
    font-size: 0;
}
.new_top .tab_head {
    top: -10px;
}
.le-core .tab_head_item {
    display: inline-block;
    height: 26px;
    line-height: 40px;
    padding-top: 0;
    font-size: 14px;
}
.le-core .top_tab_lk {
    display: inline-block;
    max-width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #999;
    font-size: 12px;
    background-color: #f6f6f6;
    height: 20px;
    line-height: 20px;
    margin: 0 4px;
    width: 62px;
    text-align: center;
    border-radius: 12px;
    font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
}
.le-core .tab_head_item .active {
    background-color: #e1251b;
    color: #fff;
}
.new_top .tab_body {
    position: absolute;
    top: 20px;
    margin-top: 10px;
}
.new_joy_list .joy_item {
    margin: 0 15px 10px;
}
.new_joy_list .joy_item_lk {
    position: relative;
    display: block;
    height: 70px;
}

/* ----- 图片的多重样式、及懒加载 ----- */
.new_joy_list .joy_item_img {
    display: block;
    width: 70px;
    height: 70px;
}
/* ----- 图片懒加载样式设计 ----- */
.lazyimg_loaded {
    transition: background .2s linear,opacity .2s linear!important;
    background: transparent;
}
.lazyimg {
    position: relative;
    overflow: hidden;
}
/* ===== 值得思考的图片样式 ===== */
.new_joy_list .joy_item_img>img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
}
.lazyimg_loaded .lazyimg_img {
    opacity: 1;
}
/* ----- 图片配套的文字部分样式 ----- */
.new_joy_list .joy_item_info {
    position: absolute;
    left: 80px;
    top: 0;
    width: 180px;
}
.new_joy_list .joy_item_name {
    display: block;
    max-height: 2.6em;
    line-height: 1.3em;
    font-size: 14px;
    word-break: break-all;
    color: #333;
    overflow: hidden;
    transition: all .2s ease;
    font-family: Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
}
.new_joy_list .joy_item_price {
    margin-top: 10px;
    font-family: Arial-BoldMT,Microsoft Yahei,PingFangSC-Medium,sans-serif,serif;
    /* 商品价格需要标粗时，使用下面的字体格式 */
    /* font-family: impact,sans-serif; */
    font-size: 16px;
    color: #e1251b;
    letter-spacing: 0;
}
.new_joy_list .joy_item_price i {
    font-size: 12px;
    font-weight: 400;
}
.new_joy_list .joy_item_price_txt-decimal {
    font-size: 12px;
}
/* 给文字和图片添加鼠标hover事件样式 */
.joy_item:hover .joy_item_img {
  opacity: 0.7;
}
.joy_item:hover .joy_item_name {
  color: #e1251b;
}
/* ===== 逛好店模块 ===== */
.nice-shop__container {
    padding: 0 15px;
}
/* ----- 背景图片的设置 ----- */
.nice-shop .shop-item--bg6 {
    background-image: url(./images/yuerbeijing.png);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
}
.nice-shop .shop-item {
    position: relative;
    display: block;
    box-sizing: border-box;
    width: 260px;
    height: 128px;
    padding: 15px 125px 15px 15px;
    margin-bottom: 10px;
}
.nice-shop .shop-item .item-title {
    max-height: 38px;
    line-height: 1.3em;
    font-size: 14px;
    color: #333;
    transition: color .2s ease;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* 限制容器可能包含的行数为2 */
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
}
.nice-shop .shop-item .item-title:hover {
    color: #e1251b;
}
.nice-shop .shop-item .item-tags {
    margin-top: 5px;
}
.nice-shop .text-tag--origin {
    color: #e2231a;
    border-color: #e2231a;
}
.text-tag {
    font-size: 12px;
    text-align: center;
    border-radius: 2px;
    padding: 0 2px;
    height: 18px;
    line-height: 17px;
    box-sizing: border-box;
    border: 1px solid transparent;
    margin-right: 5px;
    display: inline-block;
}
.text-tag:last-child {
    margin-right: 0;
}
.nice-shop .text-tag--theme {
    color: #596fab;
    border-color: #596fab;
}
.nice-shop .shop-item .item-social {
    color: #999;
    font-size: 12px;
    position: absolute;
    bottom: 15px;
}
.nice-shop .shop-item__cover {
    width: 100px;
    height: 100px;
    position: absolute;
    right: 10px;
    top: 15px;
    transition: opacity .2s ease;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
    padding: 5px;
    box-sizing: border-box;
    background: white;
}
.nice-shop .shop-item__cover>img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
}
img {
    border: 0;
    vertical-align: middle;
}
/* 当鼠标放到图片上时，透明度增加 */
.nice-shop img:hover {
    opacity: 0.7;
}
.nice-shop .shop-item--bg8 {
    background-image: url(./images/tushubeijing.png);
    background-position: 50%;
    background-repeat:no-repeat;
    background-size: cover;
}
.le-core .box_last {
    margin-right: 0;
}
.le-core .coupon {
    width: 290px;
}
.coupon .box_bd {
    background: url(./images/lingjuan.png) no-repeat bottom;
    overflow: hidden;
}
.coupon_inner {
    padding: 0 15px;
}
.coupon_list {
    height: 280px;
}
.coupon_item {
    position: relative;
    overflow: hidden;
    margin-bottom: 3px;
}
.coupon_lk {
    display: block;
    overflow: hidden;
    height: 82px;
}
.coupon_lk_wrap {
    height: 100%;
    margin-right: 40px;
}
/* 图片配文字部分===开始 */
.lazyimg_loaded {
    transition: background .2s linear,opacity .2s linear!important;
}
.lazyimg {
    position: relative;
    overflow: hidden;
}
.coupon_img {
    float: left;
    margin: 8px 0 0 7px;
    width: 50px;
    height: 50px;
    padding: 8px;
    border-radius: 50%;
    background: #fff!important;
    box-sizing: content-box;
}
.coupon_img>img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
}
.coupon_info {
    padding-top: 5px;
    margin-left: 80px;
}
.coupon_price {
    font-family: impact,sans-serif;
    display: block;
    height: 34px;
    line-height: 34px;
}
.mod_price {
    font-size: 14px;
    color: #e33333;
}
.mod_price i {
    margin-right: 3px;
    font-family: arial,sans-serif;
    font-weight: 400;
}
.coupon_price span {
    font-size: 28px;
    margin-right: 3px;
}
.coupon_limit {
    color: #999;
}
.coupon_desc,.coupon_limit {
    font-size: 12px;
    line-height: 18px;
    height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.coupon_desc {
    color: #333;
}
/* 图片配文字部分===结束 */
.coupon_more {
    position: absolute;
    height: 100%;
    line-height: 82px;
    margin-right: 32px;
    font-size: 12px;
    color: #666;
    top: 0;
    right: 0;
}
.coupon_more_inner {
    display: inline-block;
    width: 1px;
    line-height: 15px;
    vertical-align: middle;
}
.coupon_more_arrow {
    position: absolute;
    right: -28px;
    top: 0;
    font-family: iconfont,sans-serif;
}
.coupon_lk:hover .coupon_more {
    color: #e1251b;
}
</style>