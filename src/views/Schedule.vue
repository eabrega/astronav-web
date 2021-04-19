<template>
    <div class="schedule">
        <div
            v-if="EVENTS_LIST('Sunrise').length || EVENTS_LIST('Sunset').length"
            class="list"
        >
            <b-card
                class="sunrise"
                v-if="EVENTS_LIST('Sunrise').length"
                header="Восходы"
                header-tag="header"
            >
                <b-card-text style="max-width: 21rem;" class="sunrises">
                    <EventList
                        v-for="(item, index) in EVENTS_LIST('Sunrise')"
                        :key="index"
                        :sky-object="item"
                    />
                </b-card-text>
            </b-card>
            <b-card
                class="sunset"
                v-if="EVENTS_LIST('Sunset').length"
                header="Закаты"
                header-tag="header"
            >
                <b-card-text style="max-width: 21rem;" class="sunsets">
                    <EventList
                        v-for="(item, index) in EVENTS_LIST('Sunset')"
                        :key="index"
                        :sky-object="item"
                    />
                </b-card-text>
            </b-card>
        </div>
        <div class="planets-widgets">
            <Planet v-for="(item, index) in EVENTS" :key="index" :skyObject="item" />
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

    EVENTS_LIST(eventName: string) {
        const events = Array.from<ISkyEvent>(this.$store.getters.events)
            .flatMap((x) => {
                const event = x.events.find((i) => i.event == eventName);
                return new PlainEventItem(x.name, event!);
            })
            .sort((a, b) => a.Time.getTime() - b.Time.getTime())
            .filter((i) => i.Time > new Date());
        return events;
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
    grid-template-columns: auto 1fr;

    .sunrise {
        margin-bottom: 20px;
    }

    .list {
        margin-right: 20px;
    }

    .planets-widgets {
        height: 150px;
        display: flex;
        flex-flow: row wrap;
    }
}

@media (width: 320px) {
    .schedule {
        background-color: brown;
        grid-template-columns: auto 1fr;
    }
}
</style>
