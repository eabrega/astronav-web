<template>
    <div class="sky-plotter">
        <canvas id="canva" width="1200" height="300"></canvas>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Plotter } from "canvas-chart-ts/dist";

@Component
export default class PlotterWrapper extends Vue {
    plotter: Plotter | null = null;
    constructor() {
        super();
    }

    get CONDITION() {
        return this.$store.getters.condition;
    }

    get CURRENT_FRAME_ID() {
        return this.$store.state.currentFrameIndex;
    }

    get DATE() {
        return this.$store.state.date;
    }

    @Watch("CONDITION")
    conditionsUpdated() {
        this.plotter!.UpdateDataset = this.CONDITION;
        this.plotter?.DataFrameSelect(this.CURRENT_FRAME_ID);
    }

    @Watch("CURRENT_FRAME_ID")
    frameIdUpdated() {
        this.plotter?.DataFrameSelect(this.CURRENT_FRAME_ID);
    }

    mounted() {
        if (this.plotter == null) {
            let opt = {
                cellSizeX: 10,
                cellSizeY: 10,
            };
            this.plotter = new Plotter(opt);
        }

        if (this.$store.getters.condition?.length != 0) {
            this.plotter!.UpdateDataset = this.CONDITION;
            this.plotter?.DataFrameSelect(this.CURRENT_FRAME_ID);
        }
    }
}
</script>
<style scoped lang="scss">
.sky-plotter {
    margin: 0px;
}
</style>
