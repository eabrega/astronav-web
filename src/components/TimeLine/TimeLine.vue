<template>
    <div>
        <div class="time-line">
            <b-button size="sm" variant="secondary">Вчера</b-button>
            <b-input-group size="sm" :prepend="'GMT+0 ' + DISPLAY_TIME" class="range">
                <b-form-input
                    size="sm"
                    type="range"
                    v-model.number="FRAME_ID"
                    min="0"
                    :max="MAX_LENGTH"
                ></b-form-input>
            </b-input-group>
            <b-button size="sm" variant="secondary">Завтра</b-button>
        </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Vue, Watch } from "vue-property-decorator";
import DateParser from "../DateParser";
import { BFormInput } from "bootstrap-vue";

@Component
export default class TimeLine extends Vue {
    private conditionIsLoaded: boolean = false;
    constructor() {
        super();
        Vue.component("b-form-input", BFormInput);
    }

    get FRAME_ID() {
        return store.state.currentFrameIndex;
    }

    get MAX_LENGTH() {
        return (store.getters.condition?.length - 1).toString();
    }

    set FRAME_ID(val: number) {
        store.dispatch("setCurrentFrameId", Number(val));
    }

    @Watch("FRAME_ID")
    conditionsUpdated(value: string, oldValue: string) {
        this.conditionIsLoaded = true;
    }

    get DISPLAY_TIME() {
        return this.conditionIsLoaded == true
            ? store.getters.displayTime
            : "00:00";
    }

    get TIME_ZONE() {
        return store.getters.timeZone;
    }
}
</script>
<style scoped lang="scss">
.time-line {
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
