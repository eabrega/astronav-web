<template>
    <div class="app-settings-sidebar">
        <b-sidebar
            id="app-settings-sidebar"
            title="Настройки"
            width="500px"
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
                 <yandex-map
                    id="map"
                    :coords="[Lat, Lon]"
                    :zoom="15"
                    @click="onClick"
                    :controls="['geolocationControl']"
                >
                    <ymap-marker
                        :coords="[Lat, Lon]"
                        marker-id="123"
                        hint-content="some hint"
                /></yandex-map>
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
import { MapEvent } from "yandex-maps";

@Component
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

    get Lat() {
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

    onClick(e: MapEvent, c: any) {
        const coords = e.get("coords");

        this.lat = coords[0].toFixed(3);
        this.lon = coords[1].toFixed(3)
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
         padding-top: 15px;
       // padding-bottom: 5px;
        height: 250px;
    }
}
</style>
