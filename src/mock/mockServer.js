// 引入Mock对象
import Mock from 'mockjs';

// 引入模拟数据
import banners from './banners.json'
import categorylist from './categorylist.json'
import seckills from './seckill.json'
import lespecs from './lespec.json'
import nicegoods from './nicegoods.json'
import joyfind from './joyfind.json'
import newarrival from './newarrival.json'
import searchinfolist from './searchinfolist.json'
import useraddress from './useraddress.json'
const Random = Mock.Random

// mock用户收货地址
// const useraddress = Mock.mock({ 
//     "array|3": 
//     [{ 
//     "id|1-10": 2,
//     "consignee": '@cname',
//     "phoneNum": /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
//     "fullAddress": '@county(true)',
//     "userId|1-200": 1,
//     "isDefault|+1": ['1','0','0'],
//     "regionId|1-100": 1,
//     }]
// })

// 调用Mock对象的mock方法
Mock.mock('/mock/banners', {
    code: 200,
    data: banners
})
Mock.mock('/mock/categorylist', {
    code: 200,
    data: categorylist
})
Mock.mock('/mock/seckills', {
    code: 200,
    data: seckills
})
Mock.mock('/mock/lespecs', {
    code: 200,
    data: lespecs
})
Mock.mock('/mock/nicegoods', {
    code: 200,
    data: nicegoods
})
Mock.mock('/mock/joyfind', {
    code: 200,
    data: joyfind
})
Mock.mock('/mock/newarrival', {
    code: 200,
    data: newarrival
})

Mock.mock('/mock/searchinfolist', 'post', (options) => {
    // 把JSON格式转换为对象格式
    // console.log(JSON.parse(options.body))
    const searchParams = JSON.parse(options.body)
    // 数据对象
    // console.log(searchinfolist[0].goodsList)
    return {
        code: 200,
        data: searchinfolist
    }
})
// 模拟用户收货地址
Mock.mock('/mock/useraddress', {
    code: 200,
    data: useraddress
})