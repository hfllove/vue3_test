import { reqAddOrUpdateShopCart, reqGetGoodsInfo} from "@/api"
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodsInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    GOODSINFO (state,goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    // 获取产品信息
    async getGoodsInfo({commit},skuId) {
        let result = await reqGetGoodsInfo(skuId)
        if(result.code==200){
            commit('GOODSINFO',result.data)
        }
    },
    // 将产品添加到购物车（获取更新某一个产品的个数）
    async addorUpdateShopCart ({commit},{skuId,skuNum}) {
        let result = await reqAddOrUpdateShopCart (skuId,skuNum)
        // console.log(result)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    categoryView () {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo () {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList () {
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}