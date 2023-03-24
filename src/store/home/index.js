// home模块的小仓库

// 引入api接口配置
import {reqCategoryList, reqGetBannerList,reqGetLespecList,reqGetNiceGoodsList,reqGetSeckillList,reqGetJoyFindList, reqGetNewArrivalList} from '@/api'
const state = {
    categoryList: [],
    bannerList: [],
    seckillList: [],
    lespecList: [],
    nicegoodsList: [],
    joyfindList: [],
    newarrivalList: []
}
const mutations = {
    CATEGORYLIST(state,categoryList) {
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList) {
        state.bannerList = bannerList
    },
    SECKILLLIST(state,seckillList) {
        state.seckillList = seckillList
    },
    LESPECLIST(state,lespecList) {
        state.lespecList = lespecList
    },
    NICEGOODSLIST(state,nicegoodsList) {
        state.nicegoodsList = nicegoodsList
    },
    JOYFINDLIST(state,joyfindList) {
        state.joyfindList = joyfindList
    },
    NEWARRIVALLIST(state,newarrivalList){
        state.newarrivalList = newarrivalList
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}) {
        let result = await reqCategoryList()
        if(result.code == 200) {
            commit("CATEGORYLIST",result.data)
        }
    },
    async getBannerList({commit}) {
        let result = await reqGetBannerList()
        if(result.code == 200) {
            commit('BANNERLIST',result.data)
        }
    },
    async getSeckillsList({commit}) {
        let result = await reqGetSeckillList()
        if(result.code == 200) {
            commit('SECKILLLIST',result.data)
        }
    },
    async getLespecList ({commit}) {
        let result = await reqGetLespecList ()
        if(result.code == 200) {
            commit('LESPECLIST',result.data)
        }
    },
    async getNiceGoodsList ({commit}) {
        let result = await reqGetNiceGoodsList ()
        if(result.code == 200) {
            commit('NICEGOODSLIST',result.data)
        }
    },
    async getJoyFindList ({commit}) {
        let result = await reqGetJoyFindList ()
        if(result.code == 200) {
            commit('JOYFINDLIST',result.data)
        }
    },
    async getNewArrivalList ({commit}) {
        let result = await reqGetNewArrivalList ()
        if(result.code == 200) {
            commit('NEWARRIVALLIST',result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}