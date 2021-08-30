<template>
    <div id="app">
        <b-navbar toggleable="md">
            <b-navbar-brand href="#"></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse" right></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">Расписание</b-nav-item>
                    <b-nav-item to="/skymap">Карта</b-nav-item>
                    <b-nav-item to="/about">О проекте</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-b-toggle.app-settings-sidebar right
                        >Настройки</b-nav-item
                    >
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <div class="main">
            <div class="wrap">
                <AppSettingsSidebar />

                <b-alert
                    class="info_bar"
                    variant="success"
                    v-model="isShowMessageBox"
                    dismissible
                >
                    На странице представленна информация об астрономических
                    объектах видимых с учетом вашего
                    <b-link v-b-toggle.app-settings-sidebar
                        >местоположения</b-link
                    >.<br />
                    Выбранное местоположение сохранится в настройках браузера.
                    <br />
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
                            <span class="schedule-time" v-if="IS_TODAY">
                                {{ CURRENT_TIME }}
                            </span>
                            <span class="schedule-date__suffix">
                                {{ DATE_SUFFIX }}
                            </span>
                        </div>
                    </b-alert>
                </div>

                <router-view />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AppSettingsSidebar from "@/components/Common/AppSettingsSidebar.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
    name: "App",
    metaInfo: {
        title: "Главные астрономические события",
        meta: [
            {
                vmid: "description",
                name: "description",
                content:
                    "Астронамический калькулятор по формулам описанным в книге Жанна Меёса." +
                    "Расчет положения шести самых ярких планет солнечной системы на любую дату и время в зависимости от координат наблюдателя." +
                    "Суточный прогноз закатов и восходов.",
            },
            {
                vmid: "keywords",
                name: "keywords",
                content:
                    "астронамический калькулятор, расчет, координаты, тректории, фаза луны, азимут, угол места, реальное время, астрономия",
            },
        ],
    },
    components: {
        AppSettingsSidebar,
    },
})
export default class App extends Vue {
    private time = new Date();

    mounted() {
        this.runTimeUpdate();
    }

    get CURRENT_TIME() {
        return this.time.toLocaleTimeString();
    }

    get REQUEST_DATE() {
        return (this.$store.state.date as Date).toLocaleDateString();
    }

    get IS_TODAY() {
        const requestDate = this.$store.state.date as Date;
        return this.dDays(requestDate) == 0 ? true : false;
    }

    get DATE_SUFFIX() {
        let resString = "";
        const requestDate = this.$store.state.date as Date;
        const dD = this.dDays(requestDate);

        if (this.IS_TODAY) {
            return "";
        }

        const suffix = this.declOfNum(dD, ["день", "дня", "дней"]);

        switch (dD) {
            case -1:
                resString = "вчера";
                break;
            case 1:
                resString = "завтра";
                break;
            default:
                resString =
                    dD < 0
                        ? `${dD * -1} ${suffix} назад`
                        : `через ${dD} ${suffix}`;
        }

        return `(${resString})`;
    }

    get isShowMessageBox() {
        if ((window as any)?.prerenderInjected == "false") {
            return false;
        }
        return this.$store.state.isShowHelpMessage;
    }

    set isShowMessageBox(val: boolean) {
        this.$store.dispatch("setIsShowHelpMessage", false);
    }

    private runTimeUpdate() {
        setInterval(() => {
            this.time = new Date();
        }, 1000);
    }

    private declOfNum(number: number, titles: Array<string>) {
        number = Math.abs(number);
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[number % 10 < 5 ? number % 10 : 5]
        ];
    }

    private dDays(distinationDate: Date): number {
        const currentDate = new Date();
        const dDays = Math.round(
            (distinationDate.getTime() - currentDate.getTime()) / 3600000 / 24
        );
        return dDays;
    }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap");
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";

:root {
    --main-margin: 20px;
    --min-size: calc(320px - var(--main-margin) * 2);
    --max-size: 1200px;
}

@media (max-width: 440px) {
    :root {
        --main-margin: 10px;
    }
}

$font-size: 1.4em;

#app {
    min-width: var(--min-size);
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    h1 {
        font-size: 1.7em;
        padding-top: 20px;
        padding-bottom: 10px;
    }
    h2 {
        font-size: 1.6em;
        padding-top: 20px;
        padding-bottom: 15px;
    }
    p {
        font-size: 1.1em;
        padding-top: 5px;
    }

    .main {
        display: flex;
        justify-content: center;
        //flex-basis: 1200px;

        .wrap {
            max-width: calc(var(--max-size));
            min-width: calc(var(--min-size) - var(--main-margin));
            margin-left: var(--main-margin);
            margin-right: var(--main-margin);

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
        }
    }

    ::-webkit-scrollbar-track {
        background-color: rgba(0, 140, 255, 0.158);
        box-shadow: 0px 0px 3px rgb(190, 190, 190) inset;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background-color: #42b983;
        box-shadow: 0px 1px 1px rgb(190, 190, 190) inset;
        background-position: center;
        background-repeat: no-repeat;
    }

    ::-webkit-scrollbar {
        height: 15px;
    }
}

.navbar {
    background-color: rgba(0, 140, 255, 0.158);
    margin-bottom: var(--main-margin);

    .nav-item {
        padding-right: var(--main-margin);
    }

    a {
        font-weight: bold;
        font-size: 1.5em;
        color: #2c3e50;
        padding-left: 0px !important;
        &.router-link-exact-active {
            color: #42b983 !important;
        }
    }
}
</style>
