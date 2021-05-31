<template>
    <div class="icon">
        <b-icon
            :id="'tooltip-target' + name"
            :icon="EVENTS_ICONS.get(name)"
            scale="1"
            :variant="EVENTS_COLOR.get(name)"
            v-b-tooltip.hover.right
        ></b-icon>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Locale } from "@/store/constants";

@Component
export default class EventIcon extends Vue {
    @Prop()
    name!: string;

    сolorByEventName = new Map([
        ["Sunrise", "success"],
        ["Apogee", "primary"],
        ["Sunset", "danger"],
    ]);

    constructor() {
        super();
    }

    get EVENTS_ICONS() {
        return Locale.EVENTS_ICONS;
    }

    get EVENTS_COLOR() {
        return this.сolorByEventName;
    }
}
</script>

<style lang="scss">
.icon {
    padding-right: 15px;
}
</style>
