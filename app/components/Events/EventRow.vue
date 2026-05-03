<template>
    <div class="event-row" :class="{ completed: isCompleted }">
        <div class="name">{{ Constants.PLANET_RUS.get(skyObject.Name) }}</div>
        <div class="time">
            {{ skyObject.Time.toLocaleTimeString().substring(0, 5) }}
        </div>
        <div class="position">
            <b>{{ localize(skyObject.A, 2, 2) }}°</b>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Constants } from '~/utils/constants'
import type { EventItem } from '~/utils/core/EventItem'

const props = defineProps<{ skyObject: EventItem }>()
const { localize } = useLocalize()

const isCompleted = computed(() => props.skyObject.Time < new Date())
</script>

<style lang="scss">
.completed {
    color: rgba(43, 41, 41, 0.5);
    font-weight: 500;
    text-decoration: line-through;
}

.event-row {
    display: flex;
    margin-bottom: 5px;
    flex-direction: row;

    .name {
        width: 40%;
    }

    .time {
        width: auto;
    }

    .position {
        width: 45%;
        text-align: right;
    }
}
</style>
