# vue2电商项目树形目录

```
├─.gitignore
├─babel.config.js
├─jsconfig.json
├─package-lock.json
├─package.json
├─README.md
├─vue.config.js
├─src
|  ├─App.vue
|  ├─main.js
|  ├─utils
|  |   ├─token.js
|  |   └uuid_token.js
|  ├─store
|  |   ├─index.js
|  |   ├─trade
|  |   |   └index.js
|  |   ├─shopcart
|  |   |    └index.js
|  |   ├─search
|  |   |   └index.js
|  |   ├─register
|  |   |    └index.js
|  |   ├─home
|  |   |  └index.js
|  |   ├─detail
|  |   |   └index.js
|  ├─router
|  |   ├─index.js
|  |   └routes.js
|  ├─plugins
|  |    ├─myPlugins.js
|  |    └validate.js
|  ├─pages
|  |   ├─Trade
|  |   |   ├─index.vue
|  |   |   ├─images
|  |   |   |   ├─choosed.png
|  |   |   |   └goods.png
|  |   ├─ShopCart
|  |   |    ├─index.vue
|  |   |    ├─images
|  |   |    |   ├─goods1.png
|  |   |    |   ├─goods2.png
|  |   |    |   └goods3.png
|  |   ├─Search
|  |   |   ├─index.vue
|  |   |   ├─SearchSelector
|  |   |   |       ├─SearchSelector.vue
|  |   |   |       ├─images
|  |   |   ├─images
|  |   ├─Register
|  |   |    └index.vue
|  |   ├─PaySuccess
|  |   |     ├─index.vue
|  |   |     ├─images
|  |   |     |   └right.png
|  |   ├─Pay
|  |   |  ├─index.vue
|  |   |  ├─images
|  |   ├─Login
|  |   |   ├─index.vue
|  |   |   ├─images
|  |   ├─Home
|  |   |  ├─index.vue
|  |   |  ├─SecKill
|  |   |  |    ├─index.vue
|  |   |  |    ├─images
|  |   |  ├─NiceGood
|  |   |  |    ├─index.vue
|  |   |  |    ├─images
|  |   |  ├─LeCore
|  |   |  |   ├─index.vue
|  |   |  |   ├─images
|  |   |   ├─ImageList
|  |   |   |     └ImageList.vue
|  |   ├─Communication
|  |   |       ├─Communication.vue
|  |   |       ├─SyncTest
|  |   |       |    ├─Child.vue
|  |   |       |    ├─Child2.vue
|  |   |       |    └SyncTest.vue
|  |   |       ├─ScopeSlotTest
|  |   |       |       ├─List.vue
|  |   |       |       ├─List1.vue
|  |   |       |       └ScopeSlotTest.vue
|  |   |       ├─ModelTest
|  |   |       |     ├─CustomInput.vue
|  |   |       |     └ModelTest.vue
|  |   |       ├─EventTest
|  |   |       |     ├─Event1.vue
|  |   |       |     ├─Event2.vue
|  |   |       |     └EventTest.vue
|  |   |       ├─ChildrenParentTest
|  |   |       |         ├─ChildrenParentTest.vue
|  |   |       |         ├─Daughter.vue
|  |   |       |         ├─Son.vue
|  |   |       |         ├─myMixin
|  |   |       |         |    └myMixin.js
|  |   |       ├─AttrsListenersTest
|  |   |       |         ├─AttrsListenersTest.vue
|  |   |       |         ├─HintButton
|  |   |       |         |     └index.vue
|  |   ├─Center
|  |   |   ├─index.vue
|  |   |   ├─myOrder
|  |   |   |    └index.vue
|  |   |   ├─images
|  |   |   ├─groupOrder
|  |   |   |     └index.vue
|  |   ├─AddCartSuccess
|  |   |       ├─index.vue
|  |   |       ├─images
|  ├─myServer
|  |    ├─db.json
|  |    └package.json
|  ├─mock
|  |  ├─banners.json
|  |  ├─categorylist.json
|  |  ├─joyfind.json
|  |  ├─lespec.json
|  |  ├─mockServer.js
|  |  ├─newarrival.json
|  |  ├─nicegoods.json
|  |  ├─searchinfolist.json
|  |  ├─seckill.json
|  |  └useraddress.json
|  ├─components
|  |     ├─TypeNav
|  |     |    ├─index.vue
|  |     |    ├─images
|  |     ├─Pagination
|  |     |     └index.vue
|  |     ├─Header
|  |     |   ├─index.vue
|  |     |   ├─images
|  |     |   |   └logo.png
|  |     ├─Footer
|  |     |   ├─index.vue
|  |     |   ├─images
|  ├─assets
|  |   ├─logo.png
|  |   ├─pikaqiu.webp
|  |   ├─images
|  |   |   └icons.png
|  |   ├─iconfont
|  |   |    ├─iconfont.css
|  |   |    ├─iconfont.json
|  |   |    ├─iconfont.ttf
|  |   |    ├─iconfont.woff
|  |   |    └iconfont.woff2
|  ├─api
|  |  ├─ajax.js
|  |  ├─index.js
|  |  └mockAjax.js
├─public
|   ├─base.css
|   ├─favicon.ico
|   ├─index.html
|   ├─js
|   | ├─move.js
|   | └transform_move.js
|   ├─images
```