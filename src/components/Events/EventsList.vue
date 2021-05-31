<template>
    <b-card class="events-card" header="Восходы" header-tag="header">
        <b-card-text>
            <EventRow
                v-for="(item, index) in getEventsList(this.name)"
                :key="index"
                :sky-object="item"
            />
        </b-card-text>
    </b-card>
</template>

<script lang="ts">
import { PlainEventItem } from "@/components/Events/PlainEventItem";
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISkyEvent } from "@/store/ISkyInfo";
import EventRow from "@/components/Events/EventRow.vue";
@Component({
    components: {
        EventRow,
    },
})
export default class EventsList extends Vue {
    @Prop()
    name!: string;

    constructor() {
        super();
    }

    getEventsList(eventName: string) {
        return Array.from<ISkyEvent>(this.$store.state.events)
            .filter((x) => x.events.find((x) => x.event == eventName))
            .flatMap((x) => this.plainEventItemDecorator(x, eventName))
            .sort((a, b) => a.Time.getTime() - b.Time.getTime());
    }

    private plainEventItemDecorator(skyEvent: ISkyEvent, name: string): PlainEventItem[] {
        return skyEvent.events
            .filter((i) => i.event == name)
            .map((x) => {
                return new PlainEventItem(skyEvent.name, x);
            });
    }
}
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
