<template>
    <div class="sky-plotter">
        <canvas id="canva" ref="select"></canvas>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Plotter } from "@/components/Plotter/index";
import { GridLinear, GridType, IPlotterSettings } from "../Plotter/IPlotterSettings";
import { Size } from "../Plotter/Sizes/size";


@Component
export default class PlotterWrapper extends Vue {
    plotter: Plotter | null = null;
    _settings: IPlotterSettings | null = null;
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
        this.plotter!.Dataset = this.CONDITION;
        this.plotter!.DataFrameSelect = this.CURRENT_FRAME_ID;
    }

    @Watch("CURRENT_FRAME_ID")
    frameIdUpdated() {
        this.plotter!.DataFrameSelect = this.CURRENT_FRAME_ID;
    }

    mounted() {
        const mapBoxSize = document.querySelector('.sky-plotter')?.getBoundingClientRect();
        if (this.plotter == null) {
            (this.$refs.select as HTMLCanvasElement).width = mapBoxSize?.width ?? 1200;
            (this.$refs.select as HTMLCanvasElement).height = 400;

            this._settings = {
                isZooming: true, 
                isMoving: true,              
                gridSize: new Size(360, 90),
                axisConstraint: [GridType.FixedY, GridType.FixedX],
                gridLinears: [GridLinear.Top, GridLinear.Left, GridLinear.Bottom, GridLinear.Right]
            };

            this.plotter = new Plotter("canva", this._settings);
        }

        if (this.$store.getters.condition?.length != 0) {
            this.plotter!.Dataset = this.CONDITION;
            this.plotter!.DataFrameSelect = this.CURRENT_FRAME_ID;
        }
    }
}
</script>
<style scoped lang="scss">
.sky-plotter {
    margin: 0px;
}
</style>
