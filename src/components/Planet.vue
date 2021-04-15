<template>
    <div class="planet-event">
        <div class="planet-name">{{ PLANET_RUS_NAME.get(skyObject.name) }}</div>
        <div class="event" v-html="eventToString(SUNRISE)"></div>
        <div class="event" v-html="eventToString(APOGEE)"></div>
        <div class="event" v-html="eventToString(SUNSET)"></div>
    </div>
</template>

<script lang="ts">
import { ISkyEvent, ISkyEventItem } from "@/store/ISkyInfo";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Locale } from "@/store/constants";

@Component
export default class Planet extends Vue {
    @Prop()
    skyObject!: ISkyEvent;

    get SUNRISE() {
        return this.skyObject.events.find((i) => i.event == "Sunrise");
    }

    get APOGEE() {
        return this.skyObject.events.find((i) => i.event == "Apogee");
    }

    get SUNSET() {
        return this.skyObject.events.find((i) => i.event == "Sunset");
    }

    get PLANET_RUS_NAME() {
        return Locale.PLANET_RUS;
    }

    get EVENT_RUS_NAME() {
        return Locale.EVENTS_RUS;
    }
    constructor() {
        super();
    }

    private eventToString(event: ISkyEventItem) {
        const timeString = new Date(event.date).toTimeString().split(" ")[0];

        return `<div class='name'>${Locale.EVENTS_RUS.get(event.event)}</div> 
                <div class='time'>${timeString} </div>
                <div class='position'><b>${event.a}</b></div>`;
    }
}
</script>

<style lang="scss">
.planet-event {
    width: 360px;
    margin-bottom: 20px;
    .planet-name {
        font-size: 1.5em !important;
    }

    .event {
        margin-left: 20px;
        display: flex;
        justify-content: space-between;

        .name {
            width: 33%;
        }

        .time {
            width: 33%;
        }

        .position {
            width: 33%;
        }
    }
}
</style>
