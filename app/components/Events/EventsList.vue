<template>
    <BCard class="events-card" :header="title" header-tag="header">
        <BCardText>
            <EventRow
                v-for="(item, index) in eventsList"
                :key="index"
                :sky-object="item"
            />
        </BCardText>
    </BCard>
</template>

<script setup lang="ts">
import { EventItem } from '~/utils/core/EventItem'
import type { ISkyEvent } from '~/types/ISkyInfo'

const props = defineProps<{ name: string; title: string }>()
const store = useSkyStore()

const eventsList = computed(() =>
    (store.events as ISkyEvent[])
        .filter(x => x.events.some(e => e.event === props.name))
        .flatMap(x =>
            x.events
                .filter(e => e.event === props.name)
                .map(e => new EventItem(x.name, e))
        )
        .sort((a, b) => a.Time.getTime() - b.Time.getTime())
)
</script>

<style lang="scss">
.events-card {
    min-width: calc(var(--min-size) - var(--main-margin));
    flex-basis: var(--min-size);
    flex-grow: 1;
    margin-bottom: var(--main-margin);
    margin-right: var(--main-margin);
}
</style>
