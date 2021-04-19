<template>
    <div>
        <div class="time-line">
            <b-button size="sm" @click="yesterday" variant="secondary">
                Вчера
            </b-button>
            <b-input-group size="sm" :prepend="`UTC${$store.getters.timeZone}`" class="range">
                <b-input-group-prepend is-text>{{
                    $store.getters.displayTime
                }}</b-input-group-prepend>
                <b-form-input
                    size="sm"
                    type="range"
                    v-model.number="FRAME_ID"
                    min="0"
                    :max="MAX_LENGTH"
                ></b-form-input>
            </b-input-group>
            <b-button size="sm" @click="tomorrow" variant="secondary">Завтра</b-button>
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
    width: 600px;
    margin-top: 20px;
    display: flex;

    .range {
        margin-left: 15px;
        margin-right: 15px;

        .input-group-text {
            font-weight: bold;
        }
    }
}
</style>
