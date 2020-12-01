<template>
    <div class="time-line">
        <b-form-input
            id="range-1"
            v-model.number="FRAME_ID"
            type="range"
            min="0"
            :max="MAX_LENGTH"
        ></b-form-input>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Vue, Watch } from "vue-property-decorator";
import { BFormInput } from "bootstrap-vue";

@Component
export default class TimeLine extends Vue {
    constructor() {
        super();
        Vue.component("b-form-input", BFormInput);
    }

    get FRAME_ID(){
        return store.state.currentFrameIndex; 
    }

    get MAX_LENGTH(){
        return store.state.condition.length - 1;
    }

    set FRAME_ID(val:number){
        store.dispatch('setCurrentFrameId', Number(val));
    }
}
</script>
<style scoped lang="scss">
</style>
