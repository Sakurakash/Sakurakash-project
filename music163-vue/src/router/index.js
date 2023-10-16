import Vue from 'vue'
import VueRouter from 'vue-router'
// import recommend from '../views/recommend.vue'
// import singer from '../views/singer.vue'
// import rank from '../views/rank.vue'
// import search from '../views/search.vue'
// import account from '../views/account.vue'
// import detail from '../views/detail.vue'

// 实现组件的按需加载
const recommend = () => import('../views/recommend.vue')
const detail = () => import('../views/detail.vue')
const singer = () => import('../views/singer.vue')
const rank = () => import('../views/rank.vue')
const search = () => import('../views/search.vue')
const account = () => import('../views/account.vue')
Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/recommend' },
    {
        path: '/recommend',
        component: recommend,
        children: [
            {
                path: 'detail/:id/:type',
                component: detail
            }
        ]
    },
    {
        path: '/singer',
        component: singer,
        children: [
            {
                path: 'detail/:id/:type',
                component: detail
            }
        ]
    },
    {
        path: '/rank',
        component: rank,
        children: [
            {
                path: 'detail/:id/:type',
                component: detail
            }
        ]
    },
    { path: '/search', component: search },
    { path: '/account', component: account }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: routes
})

export default router
