<template>
    <div class="planet">
        <div class="planet-name">
            {{ PLANET_RUS_NAME.get(skyObject.PlanetName) }}
            <div class="status">
                <b>{{ POSITION }}</b>
            </div>
        </div>
        <div class="info-box">
            <div class="event" v-for="(event, i) in skyObject.Events" :key="i">
                <div class="icon">
                    <b-icon
                        :icon="EVENTS_ICONS.get(event.Event)"
                        scale="1"
                        :variant="EVENTS_COLOR.get(event.Event)"
                    ></b-icon>
                </div>
                <div class="time">{{ event.Date.toLocaleTimeString() }}</div>
                <div class="position-leter">{{ ANGLE_LETTERS(event.A) }}</div>
                <div class="position">
                    <b>{{ event.A.toFixed(2) }}°</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { SkyEvent } from "@/store/ISkyInfo";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Locale } from "@/store/constants";

@Component
export default class PlanetWidget extends Vue {
    @Prop(SkyEvent)
    private skyObject!: SkyEvent;

    сolorByEventName = new Map([
        ["Sunrise", "success"],
        ["Apogee", "primary"],
        ["Sunset", "danger"],
    ]);

    constructor() {
        super();
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
        return this.сolorByEventName;
    }

    get POSITION(): string {
        const sunsetDate = this.skyObject.Events.find((i) => i.Event == "Sunset")?.Date ?? null;
        const sunriseDate = this.skyObject.Events.find((i) => i.Event == "Sunrise")?.Date ?? null;
        const currentDate = this.$store.state.date as Date;

        if (!this.isToDay()) {
            return "--";
        }

        let isHideSet =
            sunriseDate! < sunsetDate!
                ? currentDate >= sunriseDate! && currentDate <= sunsetDate!
                : currentDate > sunriseDate! || currentDate < sunsetDate!;

        if (!isHideSet) {
            return "За горизонтом";
        }

        return "";
    }

    ANGLE_LETTERS(angle: number): string {
        if (angle >= 337.5 && angle <= 360) return "C";
        if (angle >= 360 && angle <= 22.5) return "C";
        if (angle >= 22.5 && angle <= 67.5) return "CВ";
        if (angle >= 67.5 && angle <= 112.5) return "В";
        if (angle >= 112.5 && angle <= 157.5) return "ЮВ";
        if (angle >= 157.5 && angle <= 202.5) return "Ю";
        if (angle >= 202.5 && angle <= 247.5) return "ЮЗ";
        if (angle >= 247.5 && angle <= 292.5) return "З";
        if (angle >= 292.5 && angle <= 337.5) return "CЗ";

        throw new Error(`Angle '${angle}' is wrong value`);
    }

    private isToDay() {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const requestDate = this.$store.state.date as Date;
        return Math.abs(currentDate.getTime() - requestDate.getTime()) < 24 * 3600 * 1000;
    }
}
</script>

<style lang="scss">
.planet {
    scroll-snap-align: center;
    min-width: 270px;
    border: grayscale($color: #0a0a0a59);
    border-style: solid;
    border-width: 1px;
    border-radius: 15px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color:  rgba(0, 140, 255, 0.158);
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
