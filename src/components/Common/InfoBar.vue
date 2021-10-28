<template>
    <div class="info_bar">
        <b-alert class="info_bar-panel" variant="secondary" show>
            <div class="latlon">
                <span>Широта: {{ localize($store.state.lat) }}</span>
                <span>Долгота: {{ localize($store.state.lon) }}</span>
            </div>
        </b-alert>
        <b-alert class="info_bar-panel" variant="secondary" show>
            <div class="date">
                <b>{{ REQUEST_DATE }}</b>
                <span class="date-time" v-if="IS_TODAY">
                    {{ CURRENT_TIME }}
                </span>
                <span class="date__suffix">
                    {{ DATE_SUFFIX }}
                </span>
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

<style lang="scss" scoped>
$font-size: 1.4em;

.info_bar {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-right: calc(var(--main-margin) * -1);

    .info_bar-panel {
        min-width: calc(var(--min-size) - var(--main-margin));
        flex-basis: 390px;
        flex-grow: 1;
        margin-right: var(--main-margin);

        &:first-of-type {
            flex-basis: 450px;
        }

        .date {
            font-size: $font-size;

            .date-time {
                margin-left: 15px;
            }

            .date__suffix {
                margin-left: 15px;
                font-size: 0.8em;
            }
        }

        .latlon {
            display: flex;
            flex-wrap: wrap;
            font-size: $font-size;

            span {
                padding-right: 20px;
            }
        }
    }
}
</style>