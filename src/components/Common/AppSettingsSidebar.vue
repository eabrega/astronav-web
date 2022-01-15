<template>
    <div class="app-settings-sidebar">
        <b-sidebar
            @shown="show"
            id="app-settings-sidebar"
            title="Настройки"
            width="450px"
            backdrop-variant="dark"
            backdrop
            shadow
            right
        >
            <div class="px-3 py-2">
                <b-input-group prepend="Широта" class="mt-3">
                    <b-form-input
                        class="input-latlon"
                        v-model.number="Lat"
                        :state="isLatValid"
                        type="number"
                        step="0.001"
                        debounce="500"
                    ></b-form-input>
                </b-input-group>
                <b-input-group prepend="Долгота" class="mt-3">
                    <b-form-input
                        class="input-latlon"
                        v-model.number="Lon"
                        :state="isLonValid"
                        type="number"
                        step="0.001"
                        debounce="500"
                    ></b-form-input>
                </b-input-group>

                <l-map
                    id="map"
                    ref="map"
                    :center="center"
                    :zoom="15"
                    @click="click"
                >
                    <l-tile-layer
                        :url="url"
                        :attribution="attribution"
                    ></l-tile-layer>
                    <l-marker ref="marker" :lat-lng="center"></l-marker>
                </l-map>

                <b-input-group prepend="Дата" class="mt-3">
                    <b-form-input
                        v-model="CurrentDate"
                        type="date"
                        debounce="500"
                        class="input-date"
                    ></b-form-input>
                </b-input-group>
                <b-button
                    class="mt-4"
                    v-on:click="update"
                    v-b-toggle.app-settings-sidebar
                    variant="success"
                    >Cохранить</b-button
                >
                <b-form-checkbox
                    v-model="isChacked"
                    class="mt-4 input-latlon"
                    size="lg"
                    name="check-button"
                    switch
                >
                    <span>Скрывать подсказки</span>
                </b-form-checkbox>
            </div>
        </b-sidebar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DateParser from "./DateParser";
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
export default class AppSettingsSidebar extends Vue {
    private lat = store.state.lat;
    private lon = store.state.lon;

    private date = new DateParser(store.state.date).toString();

    get CurrentDate(): string {
        return new DateParser(this.date).toString();
    }

    set CurrentDate(date: string) {
        this.date = new DateParser(date).toString();
    }

    get isLatValid(): boolean {
        return Math.abs(this.lat) <= 90;
    }

    get isLonValid(): boolean {
        return Math.abs(this.lon) <= 180;
    }

    set Lat(val: number) {
        this.lat = val;
    }

    get Lat(): number {
        return this.lat;
    }

    set Lon(val: number) {
        this.lon = val;
    }

    get Lon() {
        return this.lon;
    }

    get isChacked() {
        return !store.state.isShowHelpMessage;
    }

    set isChacked(val: boolean) {
        store.dispatch("setIsShowHelpMessage", !val);
    }

    update() {
        if (this.isLatValid && this.isLonValid) {
            store.dispatch("setLon", this.lon);
            store.dispatch("setLat", this.lat);

            store.dispatch("setDate", new DateParser(this.CurrentDate).Date);
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
    }

    click(e: L.LeafletMouseEvent) {
        (this.$refs.marker as LMarker).setLatLng(e.latlng);

        this.lat = parseFloat(e.latlng.lat.toFixed(3));
        this.lon = parseFloat(e.latlng.lng.toFixed(3));
    }

    constructor() {
        super();
    }
}
</script>

<style lang="scss">
.app-settings-sidebar {
    .input-group-text {
        width: 90px;
        font-weight: 550;
    }

    #map {
        margin-top: 15px;
        height: 290px;
        border-radius: 5px;
    }
}
</style>
