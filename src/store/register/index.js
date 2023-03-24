import { reqgetCode, reqGetRegister, reqGetUserInfo, reqLogOut, reqUserLogin } from "@/api"
import {setToken,getToken, removeToken} from '@/utils/token.js'
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE (state,code) {
        state.code = code
    },
    USERLOGIN (state,token) {
        state.token = token
    },
    USERINFO (state,userInfo) {
        state.userInfo = userInfo
    },
    USERLOGOUT (state) {
        state.token = '',
        state.userInfo = {},
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode ({commit},phone) {
        let result = await reqgetCode(phone)
        if(result.code == 200) {
            commit('GETCODE',result.data)
        }
    },
    // 用户提交注册信息
    async userRegister ({commit},user) {
        let result = await reqGetRegister(user)
        if(result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 【用户登录】
     async userLogin ({commit},data) {
        let result = await reqUserLogin(data)
        if(result.code == 200) {
            commit('USERLOGIN',result.data.token)
            // 持久化存储
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 带着token向服务器要用户信息
    async getUserInfo({commit}) {
        let result = await reqGetUserInfo()
        if(result.code == 200){
            commit('USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogOut ({commit}) {
        let result = await reqLogOut()
        if(result.code == 200) {
            commit('USERLOGOUT')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
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