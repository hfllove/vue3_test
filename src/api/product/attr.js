import request from '@/utils/request'

// 获取商品一级分类标题
// URL：/admin/product/getCategory1 method: get
export const reqGetCateGory1 = ()=> request({url:'/admin/product/getCategory1',method:"get"})

// 获取商品二级分类标题
// URL: /admin/product/getCategory2/{category1Id}  method: get
export const reqGetCateGory2 = (category1Id)=> request({url:`/admin/product/getCategory2/${category1Id}`,method: "get"})

// 获取商品三级分类标题
// URL：/admin/product/getCategory3/{category2Id}  method：get
export const reqGetCateGory3 = (category2Id)=> request({url:`/admin/product/getCategory3/${category2Id}`,method:"get"})

// 获取品牌属性
// URL：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} method：get
export const reqGetAttrInfoList = (category1Id,category2Id,category3Id)=> request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method: "get"})

// 添加品牌属性和属性值并且【保存】
// URL：/admin/product/saveAttrInfo method：post
export const reqSaveOrUpdateAttrInfo = (data) => request({url:'/admin/product/saveAttrInfo',data,method:"post"})

