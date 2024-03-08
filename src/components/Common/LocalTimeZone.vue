<template>
    <div class="local-time">
        <b class="header">Локальное время в точке</b>
        <div class="info">
            <span><b>UTC{{ UTC }}</b></span>
            <span class="time"> {{ CURRENT_TIME }}</span>
            <span v-if="IS_SHOW_DATE"><b>{{ CURRENT_DATE }}</b></span>
            <span>{{ TIME.location }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ICoords } from "./ICoords";
import store from "@/store";
import { ILocalTimeZone } from "@/store/ISkyInfo";
import { OffsetMapToUtc } from "@/helpers/mappers";

@Component
export default class LocalTimeZone extends Vue {
    date: Date;

    constructor() {
        super();
        this.date = this.addMinutes(new Date(), this.TIME.offset);
    }

    mounted() {
        this.runTimeUpdate();
        store.dispatch("getLocationTimeZone", { lat: this.value.lat, lon: this.value.lon });
    }

    @Prop()
    value!: ICoords;

    @Watch("value")
    updateCoordinates(val: ICoords) {
        store.dispatch("getLocationTimeZone", { lat: val.lat, lon: val.lon });
    }

    get UTC() {
        return OffsetMapToUtc(this.TIME.offset)
    }

    get TIME(): ILocalTimeZone {
        return store.getters.localTimeZone;
    }

    get DATE() {
        return this.addMinutes(new Date(), this.TIME.offset);
    }

    get CURRENT_TIME() {
        return this.date.toLocaleTimeString().substring(0, 5)
    }

    get CURRENT_DATE() {
        return this.date.toLocaleDateString();
    }

    get IS_SHOW_DATE() {
        return this.CURRENT_DATE != store.state.date.toLocaleDateString();
    }

    @Watch("forceRenderKey")
    force(val: ICoords) {
        this.date = this.DATE;
    }

    private runTimeUpdate() {
        setInterval(() => {
            this.date = this.DATE;
        }, 30000);
    }

    addMinutes(date: Date, minutes: number) {
        const gmt = new Date().getTimezoneOffset();
        date.setMinutes(date.getMinutes() + (gmt - minutes));

        return date;
    }
}
</script>

<style lang="scss" scoped>
.local-time {

    margin-bottom: 0px;
    margin-top: 15px;

    .info {
        padding: 7px;
        margin-top: 5px;
        padding-left: 10px;

        border: 1px solid #ced4da;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
    }

    p {
        padding: 0px;
        margin: 0;
    }

    span {
        margin-right: 10px;
    }

    .input-group-text {
        width: 55px;
        font-weight: 550;
    }
}
</style>