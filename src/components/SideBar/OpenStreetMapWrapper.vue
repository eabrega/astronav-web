<template>
    <div class="osm-wrapper">
        <l-map id="map" ref="map" :center="MAP_CENTER" :zoom="15" @click="click">
            <l-tile-layer :url="URL" :attribution="CONTRIBUTION"></l-tile-layer>
            <l-marker ref="marker" :lat-lng="MAP_CENTER"></l-marker>
        </l-map>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import L from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { ICoords } from "@/components/Common/ICoords";
@Component({
    components: {
        LMap,
        LTileLayer,
        LMarker,
    },
})
export default class OpenStreetMapWrapper extends Vue {
    @Prop()
    public Coordinates!: ICoords;

    private lat = this.Coordinates!.lat;
    private lon = this.Coordinates!.lon;

    @Watch("Coordinates")
    updateCoordinates(val: ICoords) {
        this.lat = val.lat;
        this.lon = val.lon;
    }

    @Emit("mapClick")
    mapClick(lat: number, lon: number): ICoords {
        return {
            lat: lat,
            lon: lon
        }
    }

    get URL(): string {
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }

    get CONTRIBUTION() {
        return '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    }

    get MAP_CENTER() {
        return [this.lat, this.lon];
    }

    mapReRender() {
        (this.$refs.map as LMap).mapObject.invalidateSize();
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
