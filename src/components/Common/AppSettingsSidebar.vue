<template>
    <div class="app-settings-sidebar">
        <b-sidebar
            id="app-settings-sidebar"
            title="Настройки"
            width="400px"
            backdrop-variant="dark"
            backdrop
            shadow
            right
            v-show="mo"
        >
            <div class="px-3 py-2">
                <b-input-group prepend="Широта" class="mt-3">
                    <b-form-input
                        class="input-latlon"
                        v-model.number="Lat"
                        :state="isLatValid"
                        type="number"
                        debounce="500"
                    ></b-form-input>
                </b-input-group>
                <b-input-group prepend="Долгота" class="mt-3">
                    <b-form-input
                        class="input-latlon"
                        v-model.number="Lon"
                        :state="isLatValid"
                        type="number"
                        debounce="500"
                    ></b-form-input>
                </b-input-group>
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
            </div>
        </b-sidebar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DateParser from "./DateParser";
import store from "@/store";

@Component
export default class AppSettingsSidebar extends Vue {
    private lat = store.state.lat;
    private lon = store.state.lon;

    get CurrentDate(): string {
        return new DateParser(store.state.date).toString();
    }

    set CurrentDate(date: string) {
        store.dispatch("setDate", new DateParser(date).Date);
    }

    get isLatValid(): boolean {
        return this.lat <= 90;
    }

    get isLonValid(): boolean {
        return this.lon <= 180;
    }

    set Lat(val: number) {
        this.lat = val;
        if (this.isLatValid) {
            store.dispatch("setLat", val);
        }
    }

    get Lat() {
        return this.lat;
    }

    set Lon(val: number) {
        this.lon = val;
        if (this.isLonValid) {
            store.dispatch("setLon", val);
        }
    }

    get Lon() {
        return this.lon;
    }

    update() {
        store.dispatch("setDate", new DateParser(this.CurrentDate).Date);
    }

    get mo() {
        return true;
    }

    constructor() {
        super();
    }
}
</script>

<style lang="scss">

</style>
