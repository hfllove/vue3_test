const webpack = require("webpack");
module.exports = {
  // 关闭eslint
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为
        changeOrigin: true,
      },
    },
    // 指定要使用的 host。如果你想让你的服务器可以被外部访问，像这样指定
    host: '0.0.0.0',
    // 自动使用一个可用端口
    port:8080,
    // 启用 webpack 的 热模块替换 特性
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 该选项允许将允许访问开发服务器的服务列入白名单。
    allowedHosts: [
      // "https://z2vddh-8080.csb.app/", // 允许访问的域名地址，即花生壳内网穿透的地址
      ".csb.app", // .是二级域名的通配符
    //   "https://47.93.148.192:8080/",
    ],
    // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
    // client: {
    //   overlay: true,
    //   // 只显示错误信息
    //   errors: true,
    //   // 这个选项允许指定 URL 到 web socket 服务器
    //   // webSocketURL: {
    //   //   hostname: '0.0.0.0',
    //   //   pathname: '/ws',
    //   //   password: 'dev-server',
    //   //   port: 8080,
    //   //   protocol: 'ws',
    //   //   username: 'webpack',
    //   // },
    // },
    disableHostCheck: true,
  },
  // 注册jquery
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
    // 指定source-map工具
    devtool: "source-map",
  },
};
