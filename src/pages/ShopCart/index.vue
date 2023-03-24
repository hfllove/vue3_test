<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cart in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="updateCartChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handlerNum('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handlerNum('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handlerNum('plus', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartListById(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck"
          @change="checkedAllCart($event)"
          :disabled="isNoCart"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 按需引入
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 获取购物车列表数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 处理商品数量
    handlerNum: throttle(async function (type, disNum, cart) {
      // type 区分不同的触发事件
      // disNum - 变化的量-1   + 变化的量+1   input 用户输入的值
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          // 如果产品个数大于1，才可以传递给服务器-1
          // 如果产品个数小于等于1，传递给服务器个数为0
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 如果用户输入变化量小于1 或者 非数字
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 如果用户输入变化量是大于1的正数 （cart.skuNum是未修改前最终的值）
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      // 接收Promise返回的结果
      try {
        await this.$store.dispatch("addorUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 再一次获取服务器最新的数据进行展示
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    }, 500),
    // 根据产品id删除购物车列表商品
    async deleteCartListById(cart) {
      try {
        await this.$store.dispatch("deleteCartListById", cart.skuId);
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    // 更新购物车商品选中状态
    async updateCartChecked(cart, event) {
      let checked = event.target.checked;
      checked = checked ? "1" : "0";
      try {
        await this.$store.dispatch("updateCartChecked", {
          skuId: cart.skuId,
          isChecked: checked,
        });
        // 再次发请求
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    // 删除选中的商品
    async deleteAllCheckedCart() {
      // 如果购物车列表的商品没有被清空 用计算属性flagCartChecked返回值来进行判断
      if(this.flagCartChecked){
          try {
              await this.$store.dispatch("deleteAllCheckedCart");
              this.getData();
          } catch (error) {
              console.log(error.message);
          } 
      }
    },
    // 点击勾选所有的按钮
    async checkedAllCart(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("checkedAllCart", isChecked);
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {
    // getters计算属性
    ...mapGetters(["cartList"]),
    // 将getters计算属性进行再次简化
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 商品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    },
    // 商品总数目
    totalNum() {
      // 定义一个用于存储的变量
      let sum = 0;
      // 筛选出选中的商品数目
      this.cartInfoList
        .filter((item) => {
          return item.isChecked == 1;
        })
        .reduce(function (prev, cur) {
          return (sum = cur.skuNum + prev);
        }, 0);
      return sum;
    },
    // 判断是否全部勾选
    isAllCheck() {
      if (this.cartInfoList.length != 0) {
        return this.cartInfoList.every((item) => item.isChecked == 1);
      } else {
        return false;
      }
    },
    // 当购物车列表商品数量为0时，全选按钮为【不可选】状态
    isNoCart() {
      if (this.cartInfoList.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    // 商品被勾选时，记为真
    flagCartChecked () {
      if(this.cartInfoList.length!=0){
        return this.cartInfoList.some(item=> item.isChecked == 1)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>