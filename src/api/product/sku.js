import request from '@/utils/request'

// 获取Sku分页列表数据
// /admin/product/list/{page}/{limit} method：get
export const reqSkuPage = (page,limit) => request({url:`/admin/product/list/${page}/${limit}`,method:"get"})

// Sku上架的数据
// /admin/product/onSale/{skuId} method：get
export const reqOnSale = (skuId) => request({url:`/admin/product/onSale/${skuId}`,method:"get"})

// Sku下架的数据
// /admin/product/cancelSale/{skuId} method: get
export const reqCancelSale = (skuId) => request({url:`/admin/product/cancelSale/${skuId}`,method:"get"})

// 查看Sku列表详情
// /admin/product/getSkuById/{skuId} method：get
export const reqGetSku = (skuId) => request({url:`/admin/product/getSkuById/${skuId}`,method:"get"})