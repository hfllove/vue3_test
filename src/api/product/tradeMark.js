// 引入二次封装的请求函数
import request from '@/utils/request'
// 对外暴露接口api

// 获取品牌管理数据
// URL: /admin/product/baseTrademark/{page}/{limit}  method: get
export const reqPageList = (page,limit) => request({url:`/admin/product/baseTrademark/${page}/${limit}`,method: "get"})

// 添加或修改品牌管理数据
// URL：【对于新增的品牌，不需要传递ID，ID由服务器生成，而修改的品牌，需要传递ID，带给服务器】
// 添加 /admin/product/baseTrademark/save     method：post  携带两个参数：品牌名称、品牌logo
// 修改 /admin/product/baseTrademark/update   method：put   携带三个参数：id、品牌名称、品牌logo
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    if(tradeMark.id){
        return request({url:`/admin/product/baseTrademark/update`,method:"put",data:tradeMark})
    }else{
        return request({url:"/admin/product/baseTrademark/save",method:"post",data:tradeMark})
    }
}

// 删除某一个品牌
// URL: /admin/product/baseTrademark/remove/{id}  method: delete
export const reqDeleteTradeMark = (id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:"delete"})