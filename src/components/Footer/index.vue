<template>
<div class="footer">
  <div class="container">
      <!-- mod_service 模块 -->
      <div class="mod_service">
          <div class="w">
              <ul>
                  <li class="item fore1"><i></i>品类齐全，轻松购物</li>
                  <li class="item fore2"><i></i>多仓直发，极速配送</li>
                  <li class="item fore3"><i></i>正品行货，精致服务</li>
                  <li class="item fore4"><i></i>天天低价，畅选无忧</li>
              </ul>
          </div>
      </div>
      <!-- 帮助模块mod_help -->
      <div class="mod_help">
          <div class="w">
              <div class="wrap">
                  <dl>
                      <dt>购物指南</dt>
                      <dd><a href="#">购物流程</a></dd>
                      <dd><a href="#">会员介绍</a></dd>
                      <dd><a href="#">生活旅行/团购</a></dd>
                      <dd><a href="#">常见问题</a></dd>
                      <dd><a href="#">联系客服</a></dd>
                  </dl>
                  <dl>
                      <dt>配送方式</dt>
                      <dd><a href="#">上门自提</a></dd>
                      <dd><a href="#">211限时达</a></dd>
                      <dd><a href="#">配送服务查询</a></dd>
                      <dd><a href="#">配送费收取标准</a></dd>
                      <dd><a href="#">海外派送</a></dd>
                  </dl>
                  <dl>
                      <dt>支付方式</dt>
                      <dd><a href="#">货到付款</a></dd>
                      <dd><a href="#">在线支付</a></dd>
                      <dd><a href="#">分期付款</a></dd>
                      <dd><a href="#">邮局汇款</a></dd>
                      <dd><a href="#">公司转账</a></dd>
                  </dl>
                  <dl>
                      <dt>售后服务</dt>
                      <dd><a href="#">售后政策</a></dd>
                      <dd><a href="#">价格保护</a></dd>
                      <dd><a href="#">退款说明</a></dd>
                      <dd><a href="#">返修/退换货</a></dd>
                      <dd><a href="#">取消订单</a></dd>
                  </dl>
                  <dl>
                      <dt>特色服务</dt>
                      <dd><a href="#">夺宝岛</a></dd>
                      <dd><a href="#">DIY装机</a></dd>
                      <dd><a href="#">延保服务</a></dd>
                      <dd><a href="#">购物E卡</a></dd>
                      <dd><a href="#">购物通信</a></dd>
                  </dl>
                  <!-- 清除wrap盒子的内部内容浮动，使页面中wrap盒子的显示更符合逻辑 -->
                  <span class="clr"></span>
              </div>
          </div>
      </div>
      <!-- footer-2022 版权模块区域 -->
      <div class="footer-2022">
          <div class="w">
              <!-- 版权链接 -->
              <div class="copyright_links">
                  <p>
                      <a href="#">关于我们</a><span>|</span>
                      <a href="#">联系我们</a><span>|</span>
                      <a href="#">联系客服</a><span>|</span>
                      <a href="#">合作招商</a><span>|</span>
                      <a href="#">商家帮助</a><span>|</span>

                      <a href="#">营销中心</a><span>|</span>
                      <a href="#">手机购物</a><span>|</span>
                      <a href="#">友情链接</a><span>|</span>
                      <a href="#">销售联盟</a><span>|</span>
                      <a href="#">购物社区</a><span>|</span>
                      <a href="#">风险监测</a><span>|</span>
                      <a href="#">隐私政策</a><span>|</span>
                      <a href="#">购物公益</a><span>|</span>
                      <a href="#">English Site</a><span>|</span>
                      <a href="#">Contact Us</a>
                  </p>
              </div>
              <!-- copyright_info模块 -->
              <div class="copyright_info">
                  <p>
                      <a href="#">京公网安备 11000002000088号</a><span>|</span>
                      <a href="#">京ICP证070359号</a><span>|</span>
                      <a href="#">互联网药品信息服务资格证编号(京)-经营性-2014-0008</a><span>|</span>
                      <a href="#">新出发京零 字第大120007号</a><span></span>
                  </p>
                  <p>
                      <a href="#">互联网出版许可证编号新出网证(京)字150号</a><span>|</span>
                      <a href="#">出版物经营许可证</a><span>|</span>
                      <a href="#">网络文化经营许可证京网文[2014]2148-348号</a><span>|</span>
                      <a href="#">违法和不良信息举报电话：4006561155</a><span></span>
                  </p>
              </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: "",
};
</script>

<style scoped>
.footer {
  padding-top: 30px;
  height: 415px;
  background-color: #f2f2f2;
}
.footer .container {
  width: 1200px;
  margin: 0 auto;
  /* overflow: hidden; */
}
/* 服务模块mod_service */
.mod_service {
  height: 80px;
  border-bottom: 1px solid #e4e1e1;
}
.mod_service ul {
  padding-left: 65px;
  margin-right: -33px;
}
.mod_service ul .item {
  float: left;
  position: relative;
  width: 292px;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  font-weight: 700;
  text-indent: 46px;
}
.mod_service ul .item i {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 42px;
  /* 不显示文本内容 */
  text-indent: -9999px;
  background: url(images/ico_service.png) no-repeat 0px 0px;
}
.mod_service ul .fore2 i {
  background: url(images/ico_service.png) no-repeat 0px -43px;
}
.mod_service ul .fore3 i {
  background: url(images/ico_service.png) no-repeat 0px -86px;
}
.mod_service ul .fore4 i {
  background: url(images/ico_service.png) no-repeat 0px -129px;
}
/* 帮助模块 mod_help */
.mod_help {
  height: 185px;
  border-bottom: 1px solid #e4e1e1;
}
.mod_help .wrap {
  padding: 20px 0px 20px 65px;
  margin-right: -140px;
}
.mod_help .wrap dl {
  float: left;
  width: 255px;
  line-height: 22px;
}
/* 清除wrap盒子的内部内容浮动，使页面中wrap盒子的显示更符合逻辑 */
.mod_help .wrap .clr {
  display: block;
  overflow: hidden;
  height: 0;
  line-height: 0;
  font-size: 0;
  clear: both;
}
.mod_help .wrap dt {
  padding-bottom: 6px;
  font-weight: 700;
  font-size: 14px;
  color: #777;
  height: 22px;
}
/* footer-2022版权模块区域 */
.footer-2022 {
  margin-top: 20px;
  padding-bottom: 25px;
  height: 100px;
}
/* copyright_links部分 */
.footer-2022 .copyright_links {
  padding: 0 0 12px 10px;
  margin-right: -40px;
  text-align: center;
}
.footer-2022 .copyright_links span {
  margin: 0 10px;
  color: #ccc;
}
/* copyright_info部分 */
.footer-2022 .copyright_info {
  padding-left: 10px;
  line-height: 22px;
  text-align: center;
}
.footer-2022 .copyright_info a {
  color: #999;
}
.footer-2022 .copyright_info a:hover {
  color: #f30213;
}
.footer-2022 .copyright_info span {
  margin: 0 10px;
  color: #ccd2da;
}
</style>
