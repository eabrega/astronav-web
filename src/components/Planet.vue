<template>
    <div class="planet">
        <div class="planet-name">
            {{ PLANET_RUS_NAME.get(skyObject.name) }}
            <div class="status" v-if="!VISIBLITY"><b>(за горизонтом)</b></div>
        </div>
        <div class="info-box">
            <div class="event" v-for="(event, i) in skyObject.events" :key="i">
                <div class="icon">
                    <b-icon
                        :icon="EVENTS_ICONS.get(event.event)"
                        scale="1"
                        :variant="EVENTS_COLOR.get(event.event)"
                    ></b-icon>
                </div>
                <div class="time">{{ getTimeString(event.date) }}</div>
                <div class="position-leter">{{ ANGLE_LETTERS(event.a) }}</div>
                <div class="position">
                    <b>{{ event.a }}°</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ISkyEvent } from "@/store/ISkyInfo";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Locale } from "@/store/constants";

@Component
export default class Planet extends Vue {
    @Prop()
    skyObject!: ISkyEvent;

    eventsColor = new Map([
        ["Sunrise", "success"],
        ["Apogee", "primary"],
        ["Sunset", "danger"],
    ]);

    constructor() {
        super();
    }

    getTimeString(dateTime: string): string {
        const date = new Date(dateTime);
        return date.toTimeString().split(" ")[0];
    }

    get PLANET_RUS_NAME() {
        return Locale.PLANET_RUS;
    }

    get EVENT_RUS_NAME() {
        return Locale.EVENTS_RUS;
    }

    get EVENTS_ICONS() {
        return Locale.EVENTS_ICONS;
    }

    get EVENTS_COLOR() {
        return this.eventsColor;
    }

    get VISIBLITY() {
        const curentDate = new Date();

        const sunsetDateStr = this.skyObject.events.find((i) => i.event == "Sunset")?.date;
        const sunriseDateStr = this.skyObject.events.find((i) => i.event == "Sunrise")?.date;

        if (sunsetDateStr == undefined || sunriseDateStr == undefined) {
            return false;
        }

        const sunsetDate = new Date(sunsetDateStr);
        const sunriseDate = new Date(sunriseDateStr);

        if (sunsetDate > sunriseDate) {
            return curentDate <= sunsetDate && curentDate >= sunriseDate;
        } else {
            return curentDate <= sunsetDate && curentDate <= sunriseDate;
        }
    }

    ANGLE_LETTERS(angle: number): string {
        if (angle >= 337.5 && angle <= 22.5) return "C";
        if (angle >= 22.5 && angle <= 67.5) return "CВ";
        if (angle >= 67.5 && angle <= 112.5) return "В";
        if (angle >= 112.5 && angle <= 157.5) return "ЮВ";
        if (angle >= 157.5 && angle <= 202.5) return "Ю";
        if (angle >= 202.5 && angle <= 247.5) return "ЮЗ";
        if (angle >= 247.5 && angle <= 292.5) return "З";
        if (angle >= 292.5 && angle <= 337.5) return "CЗ";

        throw new Error("Angle has wrong value");
    }
}
</script>

<style lang="scss">
.planet {
    width: 270px;
    border: grayscale($color: #0a0a0a59);
    border-style: solid;
    border-width: 1px;
    border-radius: 15px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: gainsboro;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    .planet-name {
        display: flex;
        flex-direction: row;
        font-size: 1.5em !important;
        padding-bottom: 5px;
        justify-content: space-between;

        .status {
            font-size: 0.6em;
        }
    }

    .info-box {
        width: 100%;

        .event {
            margin-left: 0px;
            display: flex;
            flex-direction: row;

            .icon {
                width: 20%;
            }

            .time {
                width: 40%;
            }

            .position-leter {
                width: 30px;
                margin-right: 15px;
                color: blue;
            }

            .position {
                width: 60px;
                text-align: right;
            }
        }
    }
}
</style>
