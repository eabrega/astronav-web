import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)

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
        path: '/404',
        component: PageNotFound,
    },
    {
        path: '*',
        redirect: '/404'
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
