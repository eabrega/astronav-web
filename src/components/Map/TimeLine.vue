<template>
    <div>
        <div class="time-line">
            <b-input-group
                size="sm"
                :prepend="`UTC${$store.getters.timeZone}`"
                class="range"
            >
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

    @media (max-width: 600px) {
        .range {
            height: 45px;
        }
    }

    .range {
        .input-group-text {
            font-weight: bold;
        }
    }
}
</style>
