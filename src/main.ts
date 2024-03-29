import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Mappers from '@/helpers/mappers'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMeta)
Vue.mixin(Mappers)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')