import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('LMap', LMap)
    nuxtApp.vueApp.component('LTileLayer', LTileLayer)
    nuxtApp.vueApp.component('LMarker', LMarker)
})
