<template>
    <div class="schedule">
        <b-alert
            class="info_bar"
            variant="success"
            v-model="isShowMessageBox"
            dismissible
        >
            На странице представленна информация об астрономических объектах видимых с учетом вашего
            <b-link v-b-toggle.app-settings-sidebar>местоположения</b-link>.<br />
            Выбранное местоположение сохранится в настройках браузера. <br />
            Вы всегда можете изменить отображение подсказок в
            <b-link v-b-toggle.app-settings-sidebar>настройках</b-link>.
        </b-alert>
        <div class="schedule-info_bar">
            <b-alert class="info_bar" variant="secondary" show>
                <div class="schedule-latlon">
                    <span>Широта: {{ $store.state.lat }}</span>
                    <span>Долгота: {{ $store.state.lon }}</span>
                </div>
            </b-alert>
            <b-alert class="info_bar" variant="secondary" show>
                <div class="schedule-date">
                    <b>{{ REQUEST_DATE }}</b>
                    <span class="schedule-time" v-if="IS_TODAY">{{ CURRENT_TIME }}</span>
                    <span class="schedule-date__suffix">{{ DATE_SUFFIX }}</span>
                </div>
            </b-alert>
        </div>
        <div class="schedule-body">
            <div class="planets-widgets">
                <PlanetWidget v-for="(item, index) in EVENTS" :key="index" :skyObject="item" />
            </div>
            <div class="schedule-events">
                <EventsList title="Восходы" name="Sunrise" />
                <EventsList title="Закаты" name="Sunset" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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

    private declOfNum(number: number, titles: Array<string>) {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[
            number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
        ];
    }

    get isShowMessageBox(){
        return this.$store.state.isShowHelpMessage;
    }

    set isShowMessageBox(val:boolean){
        this.$store.dispatch("setIsShowHelpMessage", false);
    }
}
</script>

<style lang="scss" scoped>
.schedule {
    max-width: var(--max-size);
    min-width: calc(var(--min-size) - var(--main-margin));

    $font-size: 1.4em;

    .schedule-info_bar {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-right: calc(var(--main-margin) * -1);

        .info_bar {
            min-width: calc(var(--min-size) - var(--main-margin));
            flex-basis: 390px;
            flex-grow: 1;
            margin-right: var(--main-margin);

            .schedule-time {
                margin-left: 15px;
            }
            .schedule-date {
                font-size: $font-size;

                .schedule-date__suffix {
                    margin-left: 15px;
                    font-size: 0.8em;
                }
            }
        }

        .info_bar:first-of-type {
            min-width: calc(var(--min-size) - var(--main-margin));
            flex-basis: 450px;
            margin-right: var(--main-margin);

            .schedule-latlon {
                display: flex;
                flex-wrap: wrap;
                font-size: $font-size;
                span {
                    padding-right: 20px;
                }
            }
        }
    }

    .schedule-body {
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
}
</style>
