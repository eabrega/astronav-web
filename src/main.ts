import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import YmapPlugin from 'vue-yandex-maps'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMeta)
Vue.use(YmapPlugin, {
    apiKey: "40abc509-38d7-4044-a712-a6d775005709",
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')