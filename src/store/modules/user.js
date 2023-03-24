import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
//###1 引入异步路由，常量路由，任意路由
import { resetRouter, asyncRoutes, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    // 用户登录验证的token
    token: getToken(),
    // // 用户的名字
    name: '',
    // // 用户的头像
    avatar: '',
    //###1 菜单权限的标记[根据不同的角色：返回的标记信息，数组里面的元素是字符串]
    routes: [],
    // 按钮权限的标记
    buttons: [],
    // 角色的信息
    roles: [],
    //###1 对比之后【项目中已有的异步路由，和服务器返回的标记进行对比最终要展示的路由】
    resultAsyncRoutes: [],
    // 用户可以访问的所有路由 
    resultAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // ###1 存储服务器返回的用户信息
  SET_USERINFO: (state, userInfo) => {
    // 用户名
    state.name = userInfo.name
    // 用户头像
    state.avatar = userInfo.avatar
    // 菜单权限的标记
    state.routes = userInfo.routes
    // 按钮权限的标记
    state.buttons = userInfo.buttons
    // 角色的信息
    state.roles = userInfo.roles
  },
  //###1 将计算出来的最终的路由存储到服务器中
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    // 计算出来有菜单权限限制的路由
    state.resultAsyncRoutes = asyncRoutes
    // 计算出当前用户需要展示的全部路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    // 把最终通过权限的动态路由添加到路由中
    router.addRoutes(state.resultAsyncRoutes)
  }
}

// ###2 定义一个函数：两个数组进行对比，对比出当前的用户到底显示哪些路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  // console.log(asyncRoutes,111)
  // console.log(routes,222)
  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) != -1) {
      // ###2 递归 考虑多级路由嵌套
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes);
      }
      return true;
    }
  })
}


const actions = {
  // 用户登录的请求
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    // 校验用户登录的名称和密码
    let result = await login({ username: username.trim(), password: password })
    if (result.code == 20000 || result.code == 200) {
      // console.log(result)
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return new Promise.reject(Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },
  // ###1再次提交计算路由请求，计算最终路由？？？？这里的data.routes有问题，应该是从getInfo中获取。
  // !!!!!!!!我们需要让全局前置守卫，或者是create阶段的生命周期函数调用这里的方法，得到计算出来的动态路由
  againLogin({ dispatch, commit, state }) {
    // if (flag) {
      console.log("该方法执行了。。。")
      // commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
      return new Promise((resolve, reject) => {
        dispatch("getInfo").then(data => {
          resolve(computedAsyncRoutes(asyncRoutes, data.routes))
          // return flag=false
        }).catch(error=> {
          reject(error)
        })
      })
      
    // }else{
    //   next()
    // }

  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 获取用户返回的信息：返回的数据包括：用户名name、用户头像avatar、routes【不同的用户名展示哪些菜单的标识】、roles(用户角色信息)、buttons【按钮权限用的标记】
        const { data } = response
        // console.log(data)
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // 存储返回的用户所有信息
        commit('SET_USERINFO', data)
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

