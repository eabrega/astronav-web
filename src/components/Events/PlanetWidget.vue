<template>
    <div class="planet-box">
        <div class="spinner" v-if="IS_LOADED">
            <div>
                <b-spinner variant="primary" label="loading..."></b-spinner>
            </div>
        </div>
        <div class="planet" v-else>
            <div class="planet-name">
                {{ PLANET_RUS_NAME.get(skyObject.Planet.Name) }}
                <span class="status">
                    {{ STATUS }}
                </span>
            </div>
            <div class="info-box">
                <div
                    class="event-row"
                    v-for="(event, i) in skyObject.Events"
                    :key="i"
                >
                    <EventIcon :name="event.Event" />
                    <div class="time">
                        {{ event.Date.toLocaleTimeString().substring(0, 5) }}
                    </div>
                    <div class="position-leter">
                        {{ ANGLE_LETTERS(event.A) }}
                    </div>
                    <div class="position-value">
                        <div v-if="event.Event !== 'Apogee'">
                            {{ localize(event.A, 2, 2) }}°
                        </div>
                        <div v-else>
                            <span class="h-symbol">h</span>
                            {{ localize(event.H, 2, 2) }}°
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Constants } from "@/store/constants";
import EventIcon from "@/components/Events/EventIcon.vue";
import { SkyEvent } from "@/core/SkyEvents/SkyEvent";

@Component({
    components: {
        EventIcon,
    },
})
export default class PlanetWidget extends Vue {
    @Prop(SkyEvent)
    skyObject!: SkyEvent;

    constructor() {
        super();
    }

    get IS_LOADED() {
        return this.$store.getters.isLoading;
    }

    get PLANET_RUS_NAME() {
        return Constants.PLANET_RUS;
    }

    get EVENT_RUS_NAME() {
        return Constants.EVENTS_RUS;
    }

    get STATUS(): string {
        const sunsetDate =
            this.skyObject.Events.find((i) => i.Event == "Sunset")?.Date ??
            null;
        const sunriseDate =
            this.skyObject.Events.find((i) => i.Event == "Sunrise")?.Date ??
            null;
        const currentDate = this.$store.state.date as Date;

        if (!this.isToDay()) {
            return "--";
        }

        let isHideSet =
            sunriseDate! < sunsetDate!
                ? currentDate >= sunriseDate! && currentDate <= sunsetDate!
                : currentDate > sunriseDate! || currentDate < sunsetDate!;

        if (!isHideSet) {
            return "Под горизонтом";
        }

        return "";
    }

    ANGLE_LETTERS(angle: number): string {
        if (angle >= 337.5 && angle <= 360) return "C";
        if (angle >= 0 && angle <= 22.5) return "C";
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
        return (
            Math.abs(currentDate.getTime() - requestDate.getTime()) <
            24 * 3600 * 1000
        );
    }
}
</script>

<style lang="scss">
.planet-box {
    scroll-snap-align: start;
    min-width: 240px;
    min-height: 135px;
    border: grayscale($color: #0a0a0a59);
    border-style: solid;
    border-width: 1px;
    border-radius: 15px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: rgba(0, 140, 255, 0.158);
    display: flex;
    flex-direction: column;
    justify-content: stretch;

    .spinner {
        height: 135px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .planet {
        .planet-name {
            display: flex;
            justify-content: space-between;
            font-size: 1.5em;
        }
        .status {
            display: flex;
            padding-left: 10px;
            justify-content: flex-end;
            font-size: 0.45em;
            font-weight: 600;
        }
        .info-box {
            width: 100%;
            padding-top: 5px;

            .event-row {
                display: flex;
                flex-direction: row;
                margin: 0px;
                .time {
                    width: 30%;
                }

                .position-leter {
                    width: 35px;
                    color: blue;
                    font-weight: 400;
                }

                .position-value {
                    font-weight: bold;
                    min-width: 80px;
                    display: flex;
                    justify-content: flex-end;

                    .h-symbol {
                        padding-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
