<template>
    <div class="schedule">
        <InfoBar />
        <div class="planets-widgets">
            <PlanetWidget
                v-for="(item, index) in EVENTS"
                :key="index"
                :skyObject="item"
            />
        </div>
        <div class="schedule-events">
            <EventsList title="Восходы" name="Sunrise" />
            <EventsList title="Закаты" name="Sunset" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoBar from "@/components/Common/InfoBar.vue";
import PlanetWidget from "@/components/Events/PlanetWidget.vue";
import EventsList from "@/components/Events/EventsList.vue";
import EventIcon from "@/components/Events/EventIcon.vue";
import { ISkyEvent, SkyEvent } from "@/store/ISkyInfo";

@Component({
    metaInfo: {
        title: "Главные астрономические события",
        meta: [
            {
                vmid: "description",
                name: "description",
                content:
                    "Расписание астрономических событий с учетом местоположения наблюдателя. " +
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
        EventsList,
        EventIcon,
        InfoBar,
    },
})
export default class Schedule extends Vue {
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

    mounted() {
        if (this.$store.getters.events?.length == 0) {
            this.$store?.dispatch("getEvents");
        }
    }
}
</script>

<style lang="scss" scoped>
.schedule {
    .schedule-events {
        display: flex;
        flex-wrap: wrap;
        margin-right: calc(var(--main-margin) * -1);
    }

    .planets-widgets {
        display: flex;
        flex-flow: row nowrap;
        overflow-x: auto;
        margin-bottom: var(--main-margin);
        padding-bottom: 10px;
        scroll-snap-type: x mandatory;
    }
}
</style>
