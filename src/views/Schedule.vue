<template>
    <div class="schedule">
        <div class="schedule-control">
            <ControlPanel />
        </div>
        <div class="schedule-body">
            <div class="list">
                <b-card class="sunrise" header="Восходы" header-tag="header">
                    <b-card-text style="max-width: 21rem;" class="sunrises">
                        <EventList
                            v-for="(item, index) in EVENTS_LIST('Sunrise')"
                            :key="index"
                            :sky-object="item"
                        />
                    </b-card-text>
                </b-card>
                <b-card class="sunset" header="Закаты" header-tag="header">
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
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Planet from "@/components/Events/PlanetWidget.vue";
import EventList from "@/components/Events/EventList.vue";
import { ISkyEvent, SkyEvent } from "@/store/ISkyInfo";
import { PlainEventItem } from "@/components/Events/PlainEventItem";
import ControlPanel from "@/components/Common/ControlPanel.vue";

@Component({
    metaInfo: {
        title: "Расписание астрономических событий",
        meta: [
            {
                vmid: "description",
                name: "description",
                content:
                    "Расписание событий происходящих в небе, с учетом наблюдателя. " +
                    "Список закатов, рассветов и зрелищных сближений планет, солнца и созвездий",
            },
        ],
    },
    components: {
        Planet,
        EventList,
        ControlPanel,
    },
})
export default class Schedule extends Vue {
    constructor() {
        super();
    }

    get EVENTS(): Array<SkyEvent> {
        const events = <Array<ISkyEvent>>this.$store.state.events;
        return events.map((x) => new SkyEvent(x));
    }

    EVENTS_LIST(eventName: string) {
        return Array.from<ISkyEvent>(this.$store.state.events)
            .filter((x) => x.events.find((x) => x.event == eventName))
            .flatMap((x) => this.plainEventItemFabric(x, eventName))
            .sort((a, b) => a.Time.getTime() - b.Time.getTime());
    }

    mounted() {
        if (this.$store.getters.events?.length == 0) {
            this.$store?.dispatch("getEvents");
        }
    }

    private plainEventItemFabric(skyEvent: ISkyEvent, name: string): PlainEventItem {
        const event = skyEvent.events.find((i) => i.event == name);
        return new PlainEventItem(skyEvent.name, event!);
    }
}
</script>

<style lang="scss">
.schedule {
    margin-left: 50px;
    margin-top: 25px;
    .schedule-control {
        margin-bottom: 20px;
    }
    .schedule-body {
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
}
</style>
