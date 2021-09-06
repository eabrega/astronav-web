<template>
    <div class="event-row" v-bind:class="{ completed: IS_COMPLETED }">
        <div class="name">{{ PLANET_RUS_NAME.get(skyObject.Name) }}</div>
        <div class="time">
            {{ skyObject.Time.toLocaleTimeString().substr(0, 5) }}
        </div>
        <div class="position">
            <b>{{ localize(skyObject.A) }}°</b>
        </div>
    </div>
</template>

<script lang="ts">
import { PlainEventItem } from "@/components/Events/PlainEventItem";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Locale } from "@/store/constants";

@Component
export default class EventRow extends Vue {
    @Prop()
    skyObject!: PlainEventItem;

    constructor() {
        super();
    }

    get PLANET_RUS_NAME() {
        return Locale.PLANET_RUS;
    }

    get IS_COMPLETED() {
        return this.skyObject.Time < new Date();
    }

    private localize(value: number): string {
        return value.toLocaleString("ru-RU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
}
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
