<template>
    <div class="event-row">
        <div class="name">{{ PLANET_RUS_NAME.get(skyObject.Name) }}</div>
        <div class="time">{{ getTimeString(skyObject.Time) }}</div>
        <div class="position">
            <b>{{ skyObject.A.toFixed(2) }}°</b>
        </div>
    </div>
</template>

<script lang="ts">
import { PlainEventItem } from "@/components/Events/PlainEventItem";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Locale } from "@/store/constants";

@Component
export default class EventList extends Vue {
    @Prop()
    skyObject!: PlainEventItem;

    constructor() {
        super();
    }

    getTimeString(dateTime: Date): string {
        return dateTime.toTimeString().split(" ")[0];
    }

    get PLANET_RUS_NAME() {
        return Locale.PLANET_RUS;
    }
}
</script>

<style lang="scss">
.event-row {
    display: flex;
    margin-bottom: 5px;
    flex-direction: row;
    
    .name {
        width: 43%;
    }

    .time {
        width: auto;
    }

    .position {
        width: 33%;
        text-align: right;
    }
}
</style>
