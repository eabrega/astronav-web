<template>
    <div class="info_bar">
        <b-alert class="info_bar-panel" variant="secondary" show>
            <div class="latlon">
                <span>Широта: {{ localize($store.state.lat) }}</span>
                <span>Долгота: {{ localize($store.state.lon) }}</span>
            </div>
        </b-alert>
        <b-alert class="info_bar-panel" variant="secondary" show>
            <div class="date-panel">
                <b-button
                    class="btn1"
                    size="sm"
                    @click="yesterday"
                    variant="secondary"
                >
                    Вчера
                </b-button>
                <div class="date-block">
                    <div class="date-block__date">{{ REQUEST_DATE }}</div>
                    <div class="date-block__time" v-if="IS_TODAY">
                        {{ CURRENT_TIME }}
                    </div>
                    <div class="date-block__suffix" v-if="!IS_TODAY">
                        {{ DATE_SUFFIX }}
                    </div>
                </div>
                <b-button
                    class="btn2"
                    size="sm"
                    @click="tomorrow"
                    variant="secondary"
                >
                    Завтра
                </b-button>
            </div>
        </b-alert>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class InfoBar extends Vue {
    private time = new Date();

    mounted() {
        this.runTimeUpdate();
    }

    yesterday() {
        let newDate = new Date(this.$store.state.date);
        newDate.setDate(newDate.getDate() - 1);
        this.$store.dispatch("setDate", newDate);
    }

    tomorrow() {
        let newDate = new Date(this.$store.state.date);
        newDate.setDate(newDate.getDate() + 1);
        this.$store.dispatch("setDate", newDate);
    }

    get CURRENT_TIME() {
        return this.time.toLocaleTimeString();
    }

    get REQUEST_DATE() {
        return (this.$store.state.date as Date).toLocaleDateString();
    }

    get IS_TODAY() {
        const requestDate = this.$store.state.date as Date;
        const currentDate = new Date();
        if (
            requestDate.getDate() == currentDate.getDate() &&
            requestDate.getMonth() == currentDate.getMonth() &&
            requestDate.getFullYear() == currentDate.getFullYear()
        ) {
            return true;
        }

        return false;
    }

    private dDays(distinationDate: Date): number {
        const currentDate = new Date();
        const dDays = Math.round(
            (distinationDate.getTime() - currentDate.getTime()) / 3600000 / 24
        );

        return dDays;
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

    private declOfNum(number: number, titles: Array<string>) {
        number = Math.abs(number);
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[number % 10 < 5 ? number % 10 : 5]
        ];
    }

    private runTimeUpdate() {
        setInterval(() => {
            this.time = new Date();
        }, 1000);
    }

    private localize(value: number): string {
        return value.toLocaleString("ru-RU", {
            style: "decimal",
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
        });
    }
}
</script>

<style lang="scss">
$font-size: 1.2em;

.info_bar {
    display: flex;
    flex-wrap: wrap;
    margin-right: calc(var(--main-margin) * -1);

    .info_bar-panel {
        min-width: calc(var(--min-size) - var(--main-margin));
        flex-grow: 1;
        margin-right: var(--main-margin);

        &:first-of-type {
            flex-basis: 350px;
        }

        .latlon {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            font-size: $font-size;

            span {
                padding-right: 20px;
            }
        }

        @media (max-width: 400px) {
            font-size: 0.9em !important;

            .date-block__suffix {
                font-size: 0.7em !important;
            }

            .btn1,
            .btn2 {
                align-self: center;
                height: 50px !important;
            }
        }

        .date-panel {
            display: grid;
            font-size: $font-size;
            align-items: center;
            justify-items: center;
            grid-template-areas: "btn1 date-block btn2";
            grid-template-columns: 70px auto 70px;

            .date-block {
                max-width: 300px;
                grid-area: date-block;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-around;

                .date-block__date {
                    display: flex;
                    min-width: 110px;
                    justify-content: center;
                }
                .date-block__suffix {
                    min-width: 110px;
                    display: flex;
                    justify-content: center;
                }
                .date-block__time {
                    min-width: 90px;
                    display: flex;
                    justify-content: center;
                }
            }

            // .btn1,
            // .btn2 {
            //     align-self: center;
            //     height: 40px;
            // }
            .btn1 {
                grid-area: btn1;
                margin-left: -25px;
            }

            .btn2 {
                grid-area: btn2;
                margin-right: -25px;
            }
        }
    }
}
</style>