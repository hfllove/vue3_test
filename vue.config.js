module.exports = {
    pages: {
      index: {
        // page 的入口
        entry: 'src/main.js',
      },
    },
    lintOnSave:false, // 关闭语法检查
    // 配置一个代理服务器用来连接另一个服务器(方式一)
    // devServer: {
    //   proxy: 'http://localhost:5000'
    // },
    // 配置一个代理服务器用来连接另一个服务器(方式二)
    devServer: {
      proxy: {
        '/atguigu': {
          target: 'http://localhost:5000',
          pathRewrite: {'^/atguigu': ''},
          ws: true,
          changeOrigin: true
        },
        '/demo': {
          target: 'http://localhost:5001',
          pathRewrite: {'^/demo': ''},
          ws: true,
          changeOrigin: true
        },
      }
    }  
  }