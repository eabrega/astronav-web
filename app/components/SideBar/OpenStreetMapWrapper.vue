<template>
    <div class="osm-wrapper">
        <l-map
            id="map"
            ref="mapRef"
            :center="mapCenter"
            :zoom="15"
            @click="onClick"
        >
            <l-tile-layer :url="tileUrl" :attribution="attribution" />
            <l-marker ref="markerRef" :lat-lng="mapCenter" />
        </l-map>
    </div>
</template>

<script setup lang="ts">
import type { ICoords } from '~/types/ICoords'

const props = defineProps<{ coordinates: ICoords }>()
const emit = defineEmits<{ mapClick: [coords: ICoords] }>()

const lat = ref(props.coordinates.lat)
const lon = ref(props.coordinates.lon)

watch(() => props.coordinates, (val) => {
    lat.value = val.lat
    lon.value = val.lon
})

const mapCenter = computed<[number, number]>(() => [lat.value, lon.value])

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution =
    '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'

const mapRef = ref<any>(null)
const markerRef = ref<any>(null)

function onClick(e: any) {
    const latlng = e.latlng
    if (markerRef.value?.leafletObject) {
        markerRef.value.leafletObject.setLatLng(latlng)
    }
    lat.value = parseFloat(latlng.lat.toFixed(3))
    lon.value = parseFloat(latlng.lng.toFixed(3))
    emit('mapClick', { lat: lat.value, lon: lon.value })
}

function mapReRender() {
    mapRef.value?.leafletObject?.invalidateSize()
}

defineExpose({ mapReRender })
</script>

<style lang="scss">
.osm-wrapper {
    margin-top: 15px;
    height: 290px;
    border-radius: 5px;
    overflow: hidden;

    .leaflet-control-attribution {
        & > a:nth-of-type(1) {
            display: none;
        }

        & > span {
            display: none;
        }
    }
}
</style>
