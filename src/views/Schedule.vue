<template>
    <div class="schedule">
        <div class="schedule-control">
            <ControlPanel />
        </div>
        <div class="schedule-date">
            <b>{{ REQUEST_DATE }}</b>
            <span class="schedule-time" v-if="IS_TODAY">{{ CURRENT_TIME }}</span>
            <span class="schedule-date__suffix">{{ DATE_SUFFIX }}</span>
        </div>
        <div class="schedule-body">
            <div class="list">
                <b-card class="sunrise" header="Восходы" header-tag="header">
                    <b-card-text style="max-width: 21rem;" class="sunrises">
                        <EventList
                            v-for="(item, index) in getEventsList('Sunrise')"
                            :key="index"
                            :sky-object="item"
                        />
                    </b-card-text>
                </b-card>
                <b-card class="sunset" header="Закаты" header-tag="header">
                    <b-card-text style="max-width: 21rem;" class="sunsets">
                        <EventList
                            v-for="(item, index) in getEventsList('Sunset')"
                            :key="index"
                            :sky-object="item"
                        />
                    </b-card-text>
                </b-card>
            </div>
            <div class="planets-widgets">
                <PlanetWidget v-for="(item, index) in EVENTS" :key="index" :skyObject="item" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PlanetWidget from "@/components/Events/PlanetWidget.vue";
import EventList from "@/components/Events/EventList.vue";
import { ISkyEvent, SkyEvent } from "@/store/ISkyInfo";
import { PlainEventItem } from "@/components/Events/PlainEventItem";
import ControlPanel from "@/components/Common/ControlPanel.vue";

@Component({
    metaInfo: {
        title: "Главные астрономические события",
        meta: [
            {
                vmid: "description",
                name: "description",
                content:
                    "Расписание астрономических событи с учетом местоположения наблюдателя. " +
                    "Список закатов, рассветов и зрелищных сближений планет, солнца и созвездий.",
            },
            {
                vmid: "keywords",
                name: "keywords",
                content:
                    "астрономия, рассписание, координаты, луна, меркурий, венера, марс, юпитер, сатурн, солнце",
            },
        ],
    },
    components: {
        PlanetWidget,
        EventList,
        ControlPanel,
    },
})
export default class Schedule extends Vue {
    private time = new Date();
    constructor() {
        super();
    }

    get EVENTS(): Array<SkyEvent> {
        const events = <Array<ISkyEvent>>this.$store.state.events;
        return events
            .map((x) => new SkyEvent(x))
            .sort((a, b) => {
                if (a.PlanetName > b.PlanetName) return 1;
                else return -1;
            });
    }

    get CURRENT_TIME() {
        return this.time.toLocaleTimeString();
    }

    get REQUEST_DATE() {
        return (this.$store.state.date as Date).toLocaleDateString();
    }

    get IS_TODAY() {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const requestDate = this.$store.state.date as Date;
        return Math.abs(currentDate.getTime() - requestDate.getTime()) < 24 * 3600 * 1000;
    }

    get DATE_SUFFIX() {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const requestDate = this.$store.state.date as Date;
        let resString = "";

        if (this.IS_TODAY) {
            return "";
        }

        const dDays = Math.round(
            Math.abs(currentDate.getTime() - requestDate.getTime()) / 3600000 / 24
        );
        const suffix = this.declOfNum(dDays, ["день", "дня", "дней"]);

        if (dDays == 1) {
            resString = currentDate > requestDate ? `вчера` : `завтра`;
        } else {
            resString =
                currentDate > requestDate ? `${dDays} ${suffix} назад` : `через ${dDays} ${suffix}`;
        }

        return `(${resString})`;
    }

    getEventsList(eventName: string) {
        return Array.from<ISkyEvent>(this.$store.state.events)
            .filter((x) => x.events.find((x) => x.event == eventName))
            .flatMap((x) => this.plainEventItemFabric(x, eventName))
            .sort((a, b) => a.Time.getTime() - b.Time.getTime());
    }

    mounted() {
        if (this.$store.getters.events?.length == 0) {
            this.$store?.dispatch("getEvents");
        }
        this.runTimeUpdate();
    }

    private runTimeUpdate() {
        setInterval(() => {
            this.time = new Date();
        }, 1000);
    }

    private plainEventItemFabric(skyEvent: ISkyEvent, name: string): PlainEventItem {
        const event = skyEvent.events.find((i) => i.event == name);
        return new PlainEventItem(skyEvent.name, event!);
    }

    private declOfNum(number: number, titles: Array<string>) {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[
            number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
        ];
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
    .schedule-time {
        margin-left: 15px;
    }
    .schedule-date {
        margin-bottom: 20px;
        font-size: 2em;

        .schedule-date__suffix {
            margin-left: 15px;
            font-size: 0.8em;
        }
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
