// 对axios二次封装
import axios from 'axios'
// 引入nprogress
import nprogress from 'nprogress'
// 引入nprogress 样式
import "nprogress/nprogress.css"

const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，必须携带的路径
    baseURL: "/mock",
    // 请求超时
    timeout: 5000
})

// 配置请求拦截器
requests.interceptors.request.use((config)=>{
    // config: 配置对象，里面包含headers请求头
    nprogress.start()
    return config
})
// 配置响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器对数据进行处理
    nprogress.done()
    return res.data
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('fail'))
})


// 对外暴露
export default requests