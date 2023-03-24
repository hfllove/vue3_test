// 当前模块：统一管理api接口
import requests from './ajax'
// mockRequests 可以随便起，不必和引入的暴露对象相同
import mockRequests from './mockAjax'


// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
// 发请求： axios发请求返回结果Promise
// export const reqCategoryList = () => requests.get(`/product/getBaseCategoryList`)

// 获取home路由的categorylist三级联动菜单数据
export const reqCategoryList = () => mockRequests.get('/categorylist')
// 获取home路由的banner轮播图数据
export const reqGetBannerList = () => mockRequests.get('/banners')
// 获取home路由下的seckill模块部分数据
export const reqGetSeckillList = () => mockRequests.get('/seckills')
// 获取home路由下的lespec模块部分数据
export const reqGetLespecList = () => mockRequests.get('/lespecs')
// 获取home路由下的nicegoods模块部分数据
export const reqGetNiceGoodsList = () => mockRequests.get('/nicegoods')
// 获取home路由下的lecore模块joy寻宝部分数据
export const reqGetJoyFindList = () => mockRequests.get('/joyfind')
// 获取home路由下的lecore模块新品首发部分数据
export const reqGetNewArrivalList = () => mockRequests.get('/newarrival')

// 带参数的post请求
// 给服务器传递的参数起码是一个空对象
export const reqGetSearchInfoList = (params) => requests({url:"/list",method:"post",data:params})
// 测试mock接口
export const reqGetAttrsList = ()=> mockRequests.get('/attrslist')

// 获取detail路由的产品详情
export const reqGetGoodsInfo = (skuId)=> requests({url:`/item/${skuId}`,method:"get"})

// 将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{skuId}/{skuNum}
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method: "post"})

// 获取detail路由的购物车列表
export const reqGetCartList = ()=> requests({url:'/cart/cartList',method: "get"}) 

// 根据id删除购物车列表的商品
//  /api/cart/deleteCart/{skuId}
export const reqDeleteCartListById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method: "delete"})

// 切换购物车商品选中状态
// URL: /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCartChecked = (skuId,isChecked)=> requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method: "get"})

// 获取验证码
// URL：/api/user/passport/sendCode/{phone}  请求方式： get
export const reqgetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method: "get"})

// 注册用户
// URL: /api/user/passport/register 请求方式：post 
export const reqGetRegister = (data) => requests({url:`/user/passport/register`,data,method: "post"})

// 登录
// URL: /api/user/passport/login  method: post    data: phone password
export const reqUserLogin = (data) => requests({url:`/user/passport/login`,data,method:"post"})

// 获取用户token带给服务器向服务器要用户信息
// URL：/api/user/passport/auth/getUserInfo  method: get
export const reqGetUserInfo = () => requests({url:`/user/passport/auth/getUserInfo`,method: "get"})

// 退出登录
// URL：/api/user/passport/logout method: get
export const reqLogOut = () => requests({url:'/user/passport/logout',method: "get"})

// 获取订单页交易信息
// URL：/api/order/auth/trade method: get
export const reqGetTrade = () => requests({url:'/order/auth/trade',method: "get"})

// 获取用户收货地址信息
// URL：/api/user/userAddress/auth/findUserAddressList  method：get
// export const reqUserAddress = () => requests({url:'/user/userAddress/auth/findUserAddressList',method: "get"})
export const reqUserAddress = () => mockRequests.get('/useraddress')

// 提交订单接口
// URL：/api/order/auth/submitOrder?tradeNo={tradeNo}   method：post
export const reqGetOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method: "post"})

// 获取订单支付信息
// URL：/api/payment/weixin/createNative/{orderId}  method：get
export const reqPayMent = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method: "get"})

// 查询用户订单支付状态
// URL：/api/payment/weixin/queryPayStatus/{orderId}  method：get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method: "get"})

// 获取已购商品订单列表
// URL：/api/order/auth/{page}/{limit}    method：get
export const reqOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method: "get"})