<template>
    <div class="osm-wrapper">
        <l-map id="map" ref="map" :center="center" :zoom="15" @click="click">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker ref="marker" :lat-lng="center"></l-marker>
        </l-map>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import store from "@/store";
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker,
    },
})
export default class OpenStreetMapWrapper extends Vue {
    private lat = store.state.lat;
    private lon = store.state.lon;

    @Emit("mapClick")
    mapClick(lat: number, lon: number): ICoords {
        return {
            lat,
            lon
        }
    }

    get url(): string {
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }

    get attribution() {
        return '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    }

    get center() {
        return [this.lat, this.lon];
    }

    show() {
        (this.$refs.map as LMap).mapObject.invalidateSize();
        console.log("PIZDA");
    }

    click(e: L.LeafletMouseEvent) {
        (this.$refs.marker as LMarker).setLatLng(e.latlng);

        this.lat = parseFloat(e.latlng.lat.toFixed(3));
        this.lon = parseFloat(e.latlng.lng.toFixed(3));

        this.mapClick(this.lat, this.lon);
    }

    constructor() {
        super();
    }
}
export interface ICoords {
    lat: number,
    lon: number
}

</script>

<style lang="scss">
.osm-wrapper {
    #map {
        margin-top: 15px;
        height: 290px;
        border-radius: 5px;
    }

    .leaflet-control-attribution {
        &>a:nth-of-type(1) {
            display: none;
        }

        &>span {
            display: none;
        }
    }
}
</style>
