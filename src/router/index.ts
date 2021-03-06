import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import VueYandexMetrika from 'vue-yandex-metrika-ts'
import PageNotFound from '../views/PageNotFound.vue'

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Schedule',
        component: () => import('../views/Schedule.vue')
    },
    {
        path: '/skymap',
        name: 'Map',
        component: () => import('../views/SkyMap.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/404',
        component: PageNotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

Vue.use(VueRouter)
Vue.use(VueYandexMetrika, {
    id: 78309397,
    router: router,
    env: process.env.NODE_ENV,
    options: {
        clickmap: true,
        webvisor: true
    }
})

export default router
