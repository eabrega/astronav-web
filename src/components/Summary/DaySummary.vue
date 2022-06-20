<template>
    <div class="day-summary">
        <!-- <div class="class">{{ summaryDate.toLocaleDateString() }}</div> -->
        <!-- <div class="summary-canva"> -->
        <canvas :id='ttt()' width="700" height="100"></canvas>
        <!-- </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Plotter } from "@/components/Plotter/index";
import { GridLinear, GridType, IPlotterSettings } from "../Plotter/IPlotterSettings";
import { Size } from "../Plotter/Sizes/size";
import { IDrawObject } from "../Plotter/drawObject";


@Component
export default class DaySummary extends Vue {
    static count: number = 0;

    count: number = 0;
    plotter: Plotter | null = null;
    //_settings: IPlotterSettings;

    constructor() {
        super();
        DaySummary.count++;
        this.count = DaySummary.count;
    }

    ttt() {
        return `canva-${this.count}`;
    }

    @Prop()
    event!: Array<IDrawObject>;
    mounted() {
        this.plotter = new Plotter(
            this.ttt(), {
            isDebug: false,
            gridSize: new Size(700, 40),
            axisConstraint: [GridType.FixedY, GridType.FixedX],
            gridLinears: [] //[GridLinear.Right, GridLinear.Left, GridLinear.Bottom]
        });

        const object = this.event;
        const mm = { time: "10:10:10", objects: object };

        this.plotter!.Dataset = [mm];
        this.plotter!.DataFrameSelect = 0;
    }
}
</script>

<style lang="scss">
.day-summary {
    display: flex;
    // margin: 0px;
    // padding: 0px;
    // height: 100%;

    // .summary-canva {
    //     margin: 0px;
    //     padding: 0px;
    //     background-color: aqua;
    // }

    canvas {
        margin: 0px;
        padding: 0px;
    }
}
</style>