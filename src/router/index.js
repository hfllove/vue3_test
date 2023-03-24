// import Vue from 'vue'
// import Router from 'vue-router'
import store from '@/store/index'
import {getToken} from '@/utils/auth'
// Vue.use(Router)

// console.log(store)

/* Layout */
import Layout from '@/layout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
/*
  ###1 不同的用户，所拥有的权限是不一样的，为了实现菜单的权限，需要对路由进行划分
  分为：
    常量路由、任意路由、权限路由
    常量路由：不管什么角色，都可以看见的路由
      登录、404、首页
    异步路由：根据不同角色，需要过滤筛选的路由
    任意路由：重定向的路由
*/

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

// 异步路由
export const asyncRoutes = [
  // 权限管理路由
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理',
        },
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权',
        },
        hidden: true,
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '菜单管理',
        },
      },
    ]
  },

  // 配置商品管理路由
  //###1 给路由的子路由进行命名
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    meta: {title:'商品管理',icon: 'el-icon-goods'},
    children: [
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/product/Spu'),
         meta: {title: 'Spu管理'}
      },
      {
        path: 'sku',
        name: 'Sku',
        component: ()=> import('@/views/product/Sku'),
        meta: {title: 'Sku管理'}
      },
      {
        path: 'trademark',
        name: 'Trademark',
        component: ()=> import('@/views/product/tradeMark'),
        meta: {title: '品牌管理'}
      },
      {
        path: 'attr',
        name: 'Attr',
        component: ()=> import('@/views/product/Attr'),
        meta: {title: '平台属性管理'}
      }
    ]
  }
]

// 任意路由
// 404 page must be placed at the end !!!
export const anyRoutes = { path: '*', redirect: '/404', hidden: true }


const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
const hasToken = getToken()

// ###3 清除之前的路由，再添加新路由
// router.selfaddRoutes = function (params){
//   router.matcher = new Router().matcher;
//   router.addRoutes(params)
// }

//###2 设置全局前置路由导航，判断页面刷新的时候，vuex中的数据是否存在，是的话重走一遍路由匹配的方法
// router.beforeEach(async(to,from,next)=>{
//   console.log(store.state.user.roles[0])
//   console.log(to.path)
//   if(hasToken && !store.state.user.roles[0]){
//       console.log(11111111)
//       await store.dispatch("user/againLogin").then(accessRoutes=>{
//       router.addRoutes(accessRoutes)
//       next({
//         ...to,
//         replace: true
//         }) 
//       })
//   }else{
//     next()
//     console.log(33333333)
//   }
  
// })

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
