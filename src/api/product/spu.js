// 引入request 
import request from '@/utils/request'

// 获取SPU数据列表
// URL：/admin/product/{page}/{limit} method：get  需要携带三个参数：page、limit、category3Id
export const reqSpuPageList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method: "get",params:{category3Id}})

// 获取SPU信息
// /admin/product/getSpuById/{spuId}  method: get
export const reqSpu = (spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:"get"})

// 获取品牌的信息
// /admin/product/baseTrademark/getTrademarkList  method: get
export const reqTradeMarkList = ()=>request({url:`/admin/product/baseTrademark/getTrademarkList`,method:"get"})

// 获取SPU图片的接口
// /admin/product/spuImageList/{spuId} method: get
export const reqSpuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method: "get"})

// 获取平台全部销售属性---整个平台销售属性一共三个
// /admin/product/baseSaleAttrList  method: get
export const reqBaseSaleAttrList = () => request({url:`/admin/product/baseSaleAttrList`,method: 'get'})

// /admin/product/saveSpuInfo  method：post 携带参数 spuInfo 添加spu数据的接口  
// /admin/product/updateSpuInfo method：post 携带参数 spuInfo 修改spu数据的接口
export const reqAddOrUpdateSpu = (spuInfo) => {
    if(spuInfo.id) {
        return request({url:`/admin/product/saveSpuInfo`,method:"post",data:spuInfo})
    }else {
        return request({url:`/admin/product/updateSpuInfo`,method:"post",data:spuInfo})
    }
}

// 删除列表选中的Spu
// /admin/product/deleteSpu/{spuId}  method：delete
export const reqDeleteSpu = (spuId) => request({url:`/admin/product/deleteSpu/${spuId}`,method: 'delete'})

// 获取销售属性的数据
// /admin/product/spuSaleAttrList/{spuId} method：get
export const reqSpuSaleAttrList = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:"get"})

// 获取品牌属性
// URL：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} method：get
export const reqGetAttrInfoList = (category1Id,category2Id,category3Id)=> request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method: "get"})

// 添加Sku
// /admin/product/saveSkuInfo method：post
export const reqAddSku = (skuInfo) => request({url:`/admin/product/saveSkuInfo`,method:'post',data:skuInfo})

// 查看Sku
// /admin/product/findBySpuId/{spuId} method：get
export const reqFindSku = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:"get"})