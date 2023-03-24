<template>
  <div class="header">
    <!-- 快捷导航栏 shortcut -->
    <div class="top">
      <div class="shortcut">
        <div class="fl">
          <!-- shortcut 快捷导航 -->
          <!-- 使用ul标签来对左侧模块进行整体设置 -->
          <ul>
            <li>品优购欢迎您!&nbsp;</li>
            <li v-if="!userName">
              <router-link to="/login">请登录</router-link>&nbsp;
              <router-link to="/register" class="style_red">免费注册</router-link>
            </li>
			<li v-else>
				<a>{{userName}}</a> <a @click="userLogOut">退出登录</a>
			</li>
          </ul>
        </div>
        <div class="fr">
          <ul>
            <li></li>
            <li><router-link to="/center/myorder">我的订单</router-link></li>
            <li></li>
            <li><a href="#">网站导航</a></li>
            <li></li>
            <li><a href="#">购物会员</a></li>
            <li></li>
            <li><a href="#">企业采购</a></li>
            <li></li>
            <li><a href="#">客户服务</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="search">
        <!-- logo图 -->
        <div class="logo">
          <router-link to="/home" title="购物商城">购物商城</router-link>
        </div>
        <!-- 搜索框 -->
        <div class="search_box">
          <input type="search" v-model="keyword" name="" id="" placeholder="立式空调" />
          <button @click="goSearch">搜索</button>
        </div>
        <!-- hotwords 热点词模块 -->
        <div class="hotwords">
          <a href="#" class="style_red">热卖手机</a>
          <a href="#">化妆品</a>
          <a href="#">草金鱼</a>
          <a href="#">绿植</a>
          <a href="#">项链</a>
        </div>
        <!-- 购物车模块shopcar -->
        <div class="shopcar">
          <!-- 跳转到购物车列表 -->
		  <router-link to="/shopcart">
		  	<span class="iconfont icon-caigou"></span>
            我的购物车
            <span class="iconfont icon-icon-test1"></span>
		  </router-link>
          <!-- 统计商品数字count -->
          <i class="count">0</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
	  return {
		  keyword: '',
	  }
  },
  mounted () {
	this.$bus.$on("clear",()=>{
		this.keyword = ""
	})
  },
  methods: {
	//	搜索按钮的回调函数：需要向search路由进行跳转
	goSearch() {
		// 路由传参：字符串形式(第一种)
		// this.$router.push("/search/" + this.keyword + "?k=" + this.keyword.toUpperCase())
		// 路由传参：模板字符串形式(第二种)
		// this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
		// 路由传参：对象形式(第三种)
		let loction = {name: "search",params: {keyword: this.keyword|| undefined}}
		if(this.$route.query){
			loction.query = this.$route.query
		}
		this.$router.push(loction)
	},
	// 用户退出登录
	async userLogOut () {
		try {
			await this.$store.dispatch('userLogOut')
			// 跳转到首页
			this.$router.push('/home')
		} catch (error) {
			console.log(error.message)
		}
		
	}
  },
  computed: {
	//   用户登录的名称
	  userName () {
		  return this.$store.state.register.userInfo.name
	  }
  }
};
</script>

<style scoped>
/*左浮动*/
.fl {
	float: left;
}
/*右浮动*/
.fr {
	float: right;
}

/*设置字体颜色为红色*/
.style_red {
	color: #c81623;
}
/* 设置字体颜色为红色，并且加粗 */
.style_red_bold {
	color: #e1251b;
	font-weight: 700;
}
.header > .top {
	height: 31px;
	/*垂直居中*/
	line-height: 31px;
	background-color: #e3e4e5;
}
/*shortcut 快捷导航栏*/
.header > .top .shortcut {
	width: 1200px;
	margin: 0 auto;
	overflow: hidden;
}

/*shortcut左侧模块*/
.shortcut ul li {
	float: left;
}

/*shortcut右侧模块*/
.shortcut .fr ul li a {
	padding: 0 10px;
}
/*用li标签做|分隔符*/
.shortcut .fr ul li:nth-child(2n-1) {
	height: 11px;
	width: 1px;
	margin-top: 10px;
	background-color: #999;
}

.outer .header > .bottom {
	width: 1200px;
	margin: 0 auto;
	overflow: hidden;
}
/*头部搜索模块 search*/
.search {
	position: relative;
	height: 105px;
	background-color: #fff;
	width: 1200px;
	margin: 0 auto;
}
/*头部左侧logo*/
.logo {
	/*定位*/
	position: absolute;
	top: 22px;
	left: 22px;
	height: 61px;
	width: 171px;
}
.logo a {	
	display: block;
	height: 61px;
	width: 171px;
	font-size: 0;
	background: url(images/logo.png) no-repeat;
}
/*头部右侧搜索框*/
.search_box {
	position: absolute;
	top: 35px;
	left: 346px;
	width: 600px;
	height: 36px;
	border: 2px solid #b1191a;
}
/*设置搜索框的input元素*/
.search_box input {
	float: left;
	width: 517px;
	height: 32px;
	padding: 0 0 0 10px;
}
/*设置搜索框的搜索按钮button*/
.search button {
	float: left;
	width: 79px;
	height: 32px;
	text-align: center;
	background-color: #b1191a;
	/*设置字体大小*/
	font-size: 16px;
	/*设置文本颜色*/
	color: #fff;
}
/*设置热词hotwords*/
.hotwords {
	position: absolute;
	left: 346px;
	top: 75px;
}
.hotwords a {
	margin-right: 10px;
}
/*设置购物车模块shopcar*/
.shopcar {
	position: absolute;
	top: 35px;
	right: 60px;
	width: 140px;
	height: 35px;
	/*水平居中*/
	text-align: center;
	/*垂直居中*/
	line-height: 35px;
	border: 1px solid #dfdfdf;
	background-color: #f7f7f7;
}
/*购物车图标*/
.icon-caigou {
	margin-right: 5px;
	color: #b1191a;	
}
/*右箭头*/
.icon-icon-test1 {
	margin-left: 5px;
}
/*统计商品数目count*/
.count {
	position: absolute;
	top: -4px;
	left: 101px;
	height: 14px;
	/*内容的垂直位置*/
	line-height: 14px;
	color: #fff;
	background-color: #e60012;
	padding: 0 5px;
	border-radius: 7px 7px 7px 0;
}
</style>