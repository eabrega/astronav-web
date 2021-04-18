<template>
    <div class="schedule">
        <div class="list">
            <h2>Восходы</h2>
            <div class="sunrises" v-for="(item, index) in SUNRISE_LIST('Sunrise')" :key="index">
                <EventList :sky-object="item" />
            </div>

            <h2>Закаты</h2>
            <div class="sunset" v-for="(item, index) in SUNRISE_LIST('Sunset')" :key="index + 20">
                <EventList :sky-object="item" />
            </div>
        </div>
        <div class="planets-widgets">
            <div v-for="(item, index) in EVENTS" :key="index">
                <Planet :skyObject="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Planet from "@/components/Planet.vue";
import EventList from "@/components/EventList.vue";
import { ISkyEvent } from "@/store/ISkyInfo";
import { PlainEventItem } from "@/components/PlainEventItem";

@Component({
    components: {
        Planet,
        EventList,
    },
})
export default class Schedule extends Vue {
    constructor() {
        super();
    }

    get EVENTS(): Array<ISkyEvent> {
        return this.$store.getters.events;
    }

    SUNRISE_LIST(eventName: string) {
        return Array.from<ISkyEvent>(this.$store.getters.events)
            .flatMap((x) => {
                const event = x.events.find((i) => i.event == eventName);
                return new PlainEventItem(x.name, event!);
            })
            .sort((a, b) => a.Time.getTime() - b.Time.getTime());
    }

    mounted() {
        //  if (this.$store.getters.condition?.length == 0) {
        this.$store?.dispatch("getEvents");
        //  }
    }
}
</script>

<style lang="scss">
.schedule {
    margin-left: 50px;
    display: grid;
    grid-template-columns: 1fr 600px;
    gap: 10px;

    .planets-widgets {
        display: flex;
        flex-wrap: wrap;
    }

    h1 {
        padding-top: 0px !important;
    }
}
</style>
