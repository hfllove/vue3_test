const { reqGetCartList, reqDeleteCartListById, reqUpdateCartChecked } = require("@/api")

const state = {
    cartlist: []
}
const mutations = {
    CARTLIST (state,cartlist) {
        state.cartlist = cartlist
    }
}
const actions = {
    // 获取购物车商品列表
    async getCartList({commit}) {
        let result = await reqGetCartList()
        if(result.code == 200){
            commit('CARTLIST',result.data)
        }
    },
    // 根据id删除购物车商品
    async deleteCartListById({commit},skuId) {
        let result = await reqDeleteCartListById(skuId)
        if(result.code == 200) {
                return 'ok'
            }else{
                return Promise.reject(new Error('faile'))
        }
    },
    // 更新购物车商品选中状态
    async updateCartChecked({commit},{skuId,isChecked}) {
        let result = await reqUpdateCartChecked(skuId,isChecked)
        if(result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除勾选框全部选中的商品
    deleteAllCheckedCart({getters,dispatch}) {
        // context: 小仓库，包含getters【计算属性】，dispatch【派发action】，state【存储数据】，commit【提交mutations修改state】
        // async ...await 返回的结果是一个promise对象

        // 定义一个数组对象用来保存每个商品的服务器返回Promise结果
        let promiseAll = []
        // 定义对象，保存单个商品的单独返回Promise结果
        let promise
        getters.cartList.cartInfoList.forEach(item=>{
            if(item.isChecked == 1){
                promise = dispatch('deleteCartListById',item.skuId)
            }
            // let promise = item.isChecked == 1 ? dispatch('deleteCartListById',item.skuId): '';
            // 将每一次返回的promise添加到数组当中
                promiseAll.push(promise)
        })

        // 只要全部的p1|p2|p3...都成功，返回的Promise结果即为成功
        // 如果有一个失败，则返回的结果为失败
        return Promise.all(promiseAll)
    },
    // 点击勾选所有的商品
    checkedAllCart ({state,dispatch},isChecked) {
        let promiseAll = []
        state.cartlist[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCartChecked',{skuId: item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    // 计算属性
    cartList (state) {
        return state.cartlist[0] || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}