<template>
    <div >
       {{PLANET_RUS_NAME.get(skyObject.Name)}} - {{getTimeString(skyObject.Time)}} - <b>{{skyObject.A}}</b>
    </div>
</template>

<script lang="ts">
import { PlainEventItem } from "@/components/PlainEventItem";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Locale } from "@/store/constants";
import { BootstrapVueIcons } from "bootstrap-vue";

@Component
export default class EventList extends Vue {
    @Prop()
    skyObject!: PlainEventItem;

    constructor() {
        super();
        Vue.use(BootstrapVueIcons);
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


</style>
