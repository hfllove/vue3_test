// 单独配置路由，对外暴露路由的地方
// 引入路由组件
// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
// 组件间通信案例
import Communication from '@/pages/Communication/Communication'

export default [
    {
        // 组件间通信相关概念深入
        path: "/communication",
        component: Communication,
        children: [
            {
                path: "model",
                component: ()=>import("@/pages/Communication/ModelTest/ModelTest")
            },
            {
                path: "childparent",
                component: ()=>import("@/pages/Communication/ChildrenParentTest/ChildrenParentTest")
            },
            {
                path: "scope-slot",
                component: ()=>import("@/pages/Communication/ScopeSlotTest/ScopeSlotTest")
            }
        ]
    },
    // 配置路径
    {
        path: "/center",
        component: Center,
        // 配置二级路由
        children: [
            {
            path: "myorder",
            component: MyOrder,
            },
            {
            path: "grouporder",
            component: GroupOrder
            }
        ],
        // 路由的重定向
        redirect: "/center/myorder",
        meta: { show: true }
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: true },
        // 只有从"/pay"路由导航，才能跳转到"/paysuccess";否则就停在原来的导航位置
        beforeEnter: (to,from,next) => {
            if(from.path.indexOf("/pay")!=-1){
                next()
            }else {
                next(false)
            }
        }
    },
    {
        path: "/pay/:tradeNo?",
        name: "pay",
        component: Pay,
        meta: { show: true },
        // 只有从"/trade"路由导航，才能跳转到"/pay"；否则就停在原来的路由位置
        beforeEnter: (to,from,next) => {
            if(from.path == "/trade"){
                next ()
            }else{
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        // 路由独享守卫： 只在路由进入时触发，而不考虑params、query以及hash的变化 
        // 只有从"/shopcart"路由导航，才能跳转到"/trade"；否则就停在原来的路由位置
        beforeEnter: (to,from,next) => {
            if(from.path == "/shopcart") {
                next ()
            }else {
                next (false)
            }
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/home",
        component: ()=> import('@/pages/Home'),
        meta: { show: true }

    },
    {
        path: "/search/:keyword?",
        component: ()=> import('@/pages/Search'),
        meta: { show: true },
        name: "search",
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    // 路由重定向
    {
        path: '*',
        redirect: "/home",
        // redirect: "/communication"
    }
]