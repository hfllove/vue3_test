import { reqGetSearchInfoList } from "@/api"

// search模块的小仓库
const state = {
    searchInfoList: {}
}
const mutations = {
    SEARCHINFOLIST (state,searchInfoList) {
        state.searchInfoList = searchInfoList
    }
}
const actions = {
    async getSearchInfoList ({commit},params) {
        let result = await reqGetSearchInfoList(params)
        if(result.code == 200) {
            // console.log(params)
            commit('SEARCHINFOLIST',result.data)
        }
    } 
}
const getters = {
    // state形参，是当前仓库服务器返回的数据
    goodsList (state) {
        return state.searchInfoList.goodsList || []
    },
    trademarkList (state) {
        return state.searchInfoList.trademarkList || []
    },
    attrsList (state) {
        return state.searchInfoList.attrsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}