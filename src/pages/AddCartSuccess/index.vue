<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <i class="sui-icon icon-pc-right"></i>
      <h3>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg">
          </div>
          <div class="right-info">
            <p class="title">{{skuInfo.skuName}}</p>
            <p class="attr" v-if="Attr.length">颜色：{{Attr[0].saleAttrValueName}} &nbsp;&nbsp;版本：{{Attr[1].saleAttrValueName}} &nbsp;&nbsp;</p><span>数量：{{$route.query.skuNum}}</span>
          </div>
        </div>
        <div class="right-gocart">
          <router-link class="sui-btn btn-xlarge" :to="`/detail/${skuInfo.id}`" >查看商品详情</router-link>
          <router-link to="/shopcart">去购物车结算 ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddCartSuccess',
    data () {
      return {
        Attr: []
      }
      
    },
    mounted () {  
      this.saleAttrChecked()
    },
    methods: {
      saleAttrChecked () {
        // 找到isChecked==='1'的对象，并且添加到Attr数组中
        this.saleAttrlist.forEach(item => {
          item.spuSaleAttrValueList.forEach(element => {
            if(element.isChecked === '1') {
              this.Attr.push(element)
            }
          })
          return this.Attr
        });
      }
    },
    computed: {
      // 产品的所有属性
      skuAttr () {
        return JSON.parse(sessionStorage.getItem('SKUINFO'))
      },
      // 产品名称相关属性
      skuInfo () {
        return this.skuAttr.skuInfo
      },
      // 产品销售属性
      saleAttrlist () {
        return this.skuAttr.spuSalelist
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart-complete-wrap {
    background-color: #f4f4f4;
    width: 1200px;
    margin: 0 auto;
    .cart-complete {
      margin: 20px 0;
      padding-left: 20px;
      position: relative;
      .icon-pc-right {
              position: absolute;
              top: 0;
              left: 20px;
              display: block;
              width: 25px;
              height: 25px;
              overflow: hidden;
              background: url(./images/addtocart-icons.png) 0 0 no-repeat;
        }
      h3 {
        font-weight: 400;
        font-size: 16px;
        color: #6aaf04;
        padding-left: 30px;
        padding-bottom: 15px;
        margin: 0;
      }

      .goods {
        overflow: hidden;
        padding: 10px 0;

        .left-good {
          float: left;

          .left-pic {
            border: 1px solid #dfdfdf;
            width: 60px;
            float: left;
            img {
              width: 60px;
              height: 60px;
            }
          }

          .right-info {
            color: #444;
            float: left;
            margin-left: 10px;

            .title {
              width: 100%;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }

            .attr {
              color: #aaa;
              display: inline-block;
              
            }
            span {
                color: #aaa;
            }
          }
        }

        .right-gocart {
          float: right;

          a {
            padding: 7px 36px;
            font-size: 15px;
            line-height: 22px;
            color: #333;
            background-color: #eee;
            text-decoration: none;
            box-sizing: border-box;
            border: 1px solid #e1e1e1;
          }

          a:hover {
            background-color: #f7f7f7;
            border: 1px solid #eaeaea;
          }

          a:active {
            background-color: #e1e1e1;
            border: 1px solid #d5d5d5;
          }

          .btn-danger {
            background-color: #e1251b;
            color: #fff;
          }

          .btn-danger:hover {
            background-color: #e1251b;
          }
        }

      }
    }
  }
</style>