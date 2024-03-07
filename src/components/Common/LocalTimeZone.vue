<template>
    <div class="local-time">
        <span class="time"><b>Локальное время:</b> {{ CURRENT_TIME }}</span>
        <span v-if="IS_SHOW_DATE">{{ CURRENT_DATE }}</span>
        <span><b>UTC</b> {{ getTime().offset / 60 }}</span>
        <span>{{ getTime().location }}</span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ICoords } from "./ICoords";
import store from "@/store";
import { ILocalTimeZone } from "@/store/ISkyInfo";

@Component
export default class LocalTimeZone extends Vue {
    date: Date;
    @Prop()
    value!: ICoords;

    constructor() {
        super();
        this.date = this.addMinutes(new Date(), this.getTime().offset);
    }

    mounted() {
        this.runTimeUpdate();
    }

    @Watch("value")
    updateCoordinates(val: ICoords) {
        store.dispatch("getLocationTimeZone", { lat: val.lat, lon: val.lon });
    }

    getTime(): ILocalTimeZone {
        return store.getters.localTimeZone;
    }

    getDate() {
        return this.addMinutes(new Date(), this.getTime().offset);
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
        this.date = this.getDate();
    }

    private runTimeUpdate() {
        setInterval(() => {
            this.date = this.getDate();
        }, 1000);
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
    padding: 7px;
    padding-left: 10px;
    margin-top: 20px;
    margin-bottom: 0px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;

    p {
        padding: 0px;
        margin: 0;
    }

    span {
        margin-right: 10px;

        .time {
            background-color: red;
        }
    }

    .input-group-text {
        width: 55px;
        font-weight: 550;
    }
}
</style>