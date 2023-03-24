// 引入请求处理函数
import mockRequest from '@/utils/mockRequest'
const state = {
    list: {}
}
const mutations = {
    GETDATA (state,list) {
        state.list = list
    }
}
const actions = {
    async getData({commit}) {
        // ###1 发请求获取mock数据
        let result = await mockRequest.get('/home/list')
        // console.log(result)
        if(result.code == 20000) {
            commit("GETDATA",result.data)
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