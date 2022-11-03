<template>
    <div class="app-settings-sidebar">
        <b-sidebar @shown="sideBarOpenendHendler" id="app-settings-sidebar" title="Настройки" width="450px"
            backdrop-variant="dark" backdrop shadow right>
            <div class="px-3 py-2">
                <b-input-group prepend="Широта" class="mt-3">
                    <b-form-input class="input-latlon" name="lat" v-model.number="Lat" :state="isLatValid" type="number"
                        step="0.001" debounce="500"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Долгота" class="mt-3">
                    <b-form-input class="input-latlon" name="lon" v-model.number="Lon" :state="isLonValid" type="number"
                        step="0.001" debounce="500"></b-form-input>
                </b-input-group>

                <b-button class="mt-4" v-on:click="coords" variant="primary" block v-if="geolocation.IsAvialable">
                    Определить место положения
                </b-button>

                <OpenStreetMapWrapper ref="map" v-on:mapClick="mapClickHendler" :Coordinates="{ lat: Lat, lon: Lon }" />

                <b-input-group prepend="Дата" class="mt-3">
                    <b-form-input v-model="CurrentDate" type="date" debounce="500" class="input-date"></b-form-input>
                </b-input-group>
                <b-button class="mt-4" v-on:click="saveButtonHendler" v-b-toggle.app-settings-sidebar variant="success">
                    Cохранить
                </b-button>
                <b-form-checkbox v-model="isChacked" class="mt-4 input-latlon" size="lg" name="check-button" switch>
                    <span>Скрывать подсказки</span>
                </b-form-checkbox>

                <b-modal id="modal-1" title="Ошибка!" ok-only header-bg-variant="warning">
                    <p class="my-2">Определение геопозиции запрещено настройками безопасности вашего браузера, для
                        изменения настроек можно воспользоваться
                        <a
                            href="https://yandex.ru/yandsearch?text=%D0%BA%D0%B0%D0%BA+%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C+%D0%B3%D0%B5%D0%BE%D0%BF%D0%BE%D0%B7%D0%B8%D1%86%D0%B8%D1%8E+%D0%B2+%D0%B1%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80%D0%B5&from=os&lr=20728">инструкцией</a>.
                    </p>
                </b-modal>
            </div>
        </b-sidebar>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DateParser from "./DateParser";
import store from "@/store";
import Geo from "./Geolocation";
import OpenStreetMapWrapper from "./OpenStreetMapWrapper.vue"
import { ICoords } from "@/components/Common/ICoords";
@Component({
    components: {
        OpenStreetMapWrapper
    },
})
export default class AppSettingsSidebar extends Vue {
    private lat = store.state.lat;
    private lon = store.state.lon;
    readonly geolocation = new Geo();
    private date = new DateParser(store.state.date).toString();
    private mapWrapper!: OpenStreetMapWrapper;

    mapClickHendler(i: ICoords) {
        this.lat = i.lat;
        this.lon = i.lon;
    }

    get COORDS() {
        return {
            Lat: this.lat,
            Lon: this.lon
        }
    }

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

    saveButtonHendler() {
        if (this.isLatValid && this.isLonValid) {
            store.dispatch("setLon", this.lon);
            store.dispatch("setLat", this.lat);

            store.dispatch("setDate", new DateParser(this.CurrentDate).Date);
        }
    }

    sideBarOpenendHendler() {
        this.mapWrapper.mapReRender();
    }

    async coords() {
        this.geolocation.UpdateCoorgs()
            .then((c) => {
                this.lat = parseFloat(c.latitude.toFixed(3));
                this.lon = parseFloat(c.longitude.toFixed(3));
            })
            .catch((i: GeolocationPositionError) => {
                this.$bvModal.show(`modal-${i.code}`);
            });
    }

    constructor() {
        super();
    }

    mounted() {
        this.mapWrapper = (this.$refs.map as OpenStreetMapWrapper);
    }
}
</script>

<style lang="scss">
.app-settings-sidebar {
    .input-group-text {
        width: 90px;
        font-weight: 550;
    }
}
</style>
