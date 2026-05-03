<template>
    <div class="planet-box">
        <div class="spinner" v-if="store.isLoading">
            <div>
                <BSpinner variant="primary" label="loading..." />
            </div>
        </div>
        <div class="planet" v-else>
            <div class="planet-name">
                {{ Constants.PLANET_RUS.get(skyObject.Planet.Name) }}
                <span class="status">{{ status }}</span>
            </div>
            <div class="info-box">
                <div
                    class="event"
                    v-for="(event, i) in skyObject.Events"
                    :key="i"
                >
                    <EventIcon :name="event.Event" />
                    <div class="time">
                        {{ event.Date.toLocaleTimeString().substring(0, 5) }}
                    </div>
                    <div class="position-leter">{{ angleLetter(event.A) }}</div>
                    <div class="position">
                        <b>{{ localize(event.A, 2, 2) }}°</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Constants } from '~/utils/constants'
import type { SkyEvent } from '~/utils/core/SkyEvent'

const props = defineProps<{ skyObject: SkyEvent }>()
const store = useSkyStore()
const { localize } = useLocalize()

const status = computed((): string => {
    const sunsetDate =
        props.skyObject.Events.find(i => i.Event === 'Sunset')?.Date ?? null
    const sunriseDate =
        props.skyObject.Events.find(i => i.Event === 'Sunrise')?.Date ?? null
    const current = store.date as Date

    if (!isToday()) return '--'

    const visible =
        sunriseDate! < sunsetDate!
            ? current >= sunriseDate! && current <= sunsetDate!
            : current > sunriseDate! || current < sunsetDate!

    return visible ? '' : 'Под горизонтом'
})

function isToday() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const req = store.date as Date
    return Math.abs(today.getTime() - req.getTime()) < 24 * 3600 * 1000
}

function angleLetter(angle: number): string {
    if (angle >= 337.5 || angle <= 22.5) return 'С'
    if (angle <= 67.5) return 'СВ'
    if (angle <= 112.5) return 'В'
    if (angle <= 157.5) return 'ЮВ'
    if (angle <= 202.5) return 'Ю'
    if (angle <= 247.5) return 'ЮЗ'
    if (angle <= 292.5) return 'З'
    return 'СЗ'
}
</script>

<style lang="scss">
.planet-box {
    scroll-snap-align: start;
    min-width: 240px;
    min-height: 135px;
    border: 1px solid rgba(10, 10, 10, 0.35);
    border-radius: 15px;
    padding: 10px;
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

            .event {
                margin-left: 0px;
                display: flex;
                flex-direction: row;

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
}
</style>
