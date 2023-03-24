import { reqGetTrade, reqUserAddress } from "@/api"

const state = {
    tradeList: {},
    userAddress: []
}
const mutations = {
    TRADELIST (state,tradeList) {
        state.tradeList = tradeList
    },
    USERADDRESS (state,userAddress) {
        state.userAddress = userAddress
    },
    ISDEFAULT (state,addressAll) {
        state.userAddress = addressAll
    }
}
const actions = {
    // 获取订单交易商品信息
    async getTradeList ({commit}) {
        let result = await reqGetTrade()
        if(result.code == 200) {
            commit('TRADELIST',result.data)
        }
    },
    // 获取用户收货地址信息
    async getUserAddress ({commit}) {
        let result = await reqUserAddress()
        if(result.code == 200) {
            commit('USERADDRESS',result.data)
        }
    }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}