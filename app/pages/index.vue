<template>
    <div class="schedule">
        <InfoBar />
        <div class="planets-widgets">
            <PlanetWidget
                v-for="(item, index) in events"
                :key="index"
                :sky-object="item"
            />
        </div>
        <div class="schedule-events">
            <EventsList title="Восходы" name="Sunrise" />
            <EventsList title="Заходы" name="Sunset" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { SkyEvent } from '~/utils/core/SkyEvent'

useHead({
    title: 'Главные астрономические события',
    meta: [
        {
            name: 'description',
            content:
                'Расписание астрономических событий с учетом местоположения наблюдателя. ' +
                'Список закатов, рассветов и зрелищных сближений планет, солнца и созвездий.',
        },
        {
            name: 'keywords',
            content:
                'астрономия, расписание, координаты, луна, меркурий, венера, марс, юпитер, сатурн, солнце',
        },
    ],
})

const store = useSkyStore()

const events = computed(() =>
    store.events
        .map(x => new SkyEvent(x))
        .sort((a, b) => a.Planet.SerialNumber - b.Planet.SerialNumber)
)

onMounted(() => {
    if (store.events.length === 0) {
        store.getEvents()
    }
})
</script>

<style lang="scss" scoped>
.schedule {
    .schedule-events {
        display: flex;
        flex-wrap: wrap;
        margin-right: calc(var(--main-margin) * -1);
    }

    .planets-widgets {
        @media print {
            flex-flow: wrap;
            margin-bottom: 0px;

            & > :nth-child(n) {
                margin-right: 10px;
                margin-bottom: 10px;
            }

            & > :nth-last-child(1) {
                margin-right: 0px;
            }
        }

        & > :nth-child(n) {
            margin-right: 20px;
        }

        & > :nth-last-child(1) {
            margin-right: 0px;
        }

        display: flex;
        flex-flow: row nowrap;
        overflow-x: auto;
        margin-bottom: var(--main-margin);
        padding-bottom: 10px;
        scroll-snap-type: x mandatory;
    }
}
</style>
