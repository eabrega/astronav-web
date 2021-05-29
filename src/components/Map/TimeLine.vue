<template>
    <div>
        <div class="time-line">
            <b-button class="btn1" size="sm" @click="yesterday" variant="secondary">
                Вчера
            </b-button>
            <b-input-group size="sm" :prepend="`UTC${$store.getters.timeZone}`" class="range">
                <b-input-group-prepend is-text>{{
                    $store.getters.displayTime
                }}</b-input-group-prepend>
                <b-form-input
                class="range"
                    size="sm"
                    type="range"
                    v-model.number="FRAME_ID"
                    min="0"
                    :max="MAX_LENGTH"
                ></b-form-input>
            </b-input-group>
            <b-button class="btn2" size="sm" @click="tomorrow" variant="secondary">Завтра</b-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TimeLine extends Vue {
    constructor() {
        super();
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

    get FRAME_ID() {
        return this.$store.state.currentFrameIndex;
    }

    set FRAME_ID(val: number) {
        this.$store.dispatch("setCurrentFrameId", Number(val));
    }

    get MAX_LENGTH() {
        return (this.$store.getters.condition?.length - 1).toString();
    }
}
</script>
<style scoped lang="scss">
.time-line {
    margin-top: 5px;
    display: grid;
    gap: 10px;

    @media (min-width: 600px) {
        grid-template-areas: "btn1 line btn2";
        grid-template-columns: 60px auto 60px;
    }

    @media (max-width: 600px) {
        grid-template-areas:
            "line line"
            "btn1 btn2";

        .btn1,
        .btn2 {
            height: 35px;
            width: 70px;
        }

        .btn2 {
            justify-self: end;
        }

        .range{height: 45px;}
    }

    .range {
        grid-area: line;

        .input-group-text {
            font-weight: bold;
        }
    }

    .btn1 {
        grid-area: btn1;
    }

    .btn2 {
        grid-area: btn2;
    }
}
</style>
