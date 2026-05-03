<template>
    <div class="info_bar">
        <BAlert class="info_bar-panel" variant="secondary" :model-value="true">
            <div class="latlon">
                <span>Широта: {{ localize(store.lat, 0, 3) }}</span>
                <span>Долгота: {{ localize(store.lon, 0, 3) }}</span>
            </div>
        </BAlert>
        <BAlert class="info_bar-panel" variant="secondary" :model-value="true">
            <div class="date-panel">
                <BButton class="btn1" size="sm" @click="yesterday" variant="secondary">
                    Вчера
                </BButton>
                <div class="date-block">
                    <div class="date-block__date">{{ requestDate }}</div>
                    <div class="date-block__time" v-if="isToday">
                        {{ currentTime }}
                    </div>
                    <div class="date-block__suffix" v-if="!isToday">
                        {{ dateSuffix }}
                    </div>
                </div>
                <BButton class="btn2" size="sm" @click="tomorrow" variant="secondary">
                    Завтра
                </BButton>
            </div>
        </BAlert>
    </div>
</template>

<script setup lang="ts">
const store = useSkyStore()
const { localize } = useLocalize()

const time = ref(new Date())

const requestDate = computed(() => store.date.toLocaleDateString())

const currentTime = computed(() => time.value.toLocaleTimeString())

const isToday = computed(() => {
    const r = store.date
    const now = new Date()
    return (
        r.getDate() === now.getDate() &&
        r.getMonth() === now.getMonth() &&
        r.getFullYear() === now.getFullYear()
    )
})

const dateSuffix = computed(() => {
    if (isToday.value) return ''
    const dD = dDays(store.date)
    const suffix = declOfNum(dD, ['день', 'дня', 'дней'])
    if (dD === -1) return '(вчера)'
    if (dD === 1) return '(завтра)'
    return dD < 0 ? `(${dD * -1} ${suffix} назад)` : `(через ${dD} ${suffix})`
})

function yesterday() {
    const d = new Date(store.date)
    d.setDate(d.getDate() - 1)
    store.setDate(d)
}

function tomorrow() {
    const d = new Date(store.date)
    d.setDate(d.getDate() + 1)
    store.setDate(d)
}

function dDays(dest: Date): number {
    return Math.round((dest.getTime() - new Date().getTime()) / 3600000 / 24)
}

function declOfNum(number: number, titles: string[]) {
    number = Math.abs(number)
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
    ]
}

onMounted(() => {
    setInterval(() => {
        time.value = new Date()
    }, 1000)
})
</script>

<style lang="scss">
$font-size: 1.2em;

@media print {
    .info_bar {
        padding-top: 40px;
        padding-bottom: 10px;
    }

    .info_bar-panel {
        display: contents;
        border: 0;
        background-color: transparent;
        font-size: 1.5em;
    }

    .date-block__time {
        padding-left: 20px;
    }

    .btn1,
    .btn2 {
        display: none;
    }
}

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
