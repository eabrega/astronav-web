<template>
    <div class="sky-plotter">
        <canvas id="canva" ref="canvasRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Plotter } from '~/components/Plotter/index'
import { GridLinear, GridType } from '~/components/Plotter/IPlotterSettings'
import type { IPlotterSettings } from '~/components/Plotter/IPlotterSettings'
import { Size } from '~/components/Plotter/Sizes/size'

const store = useSkyStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const plotter = ref<Plotter | null>(null)

const condition = computed(() => store.condition)
const frameId = computed(() => store.currentFrameIndex)

watch(condition, () => {
    if (plotter.value) {
        plotter.value.Dataset = store.condition
        plotter.value.DataFrameSelect = store.currentFrameIndex
    }
})

watch(frameId, (val) => {
    if (plotter.value) {
        plotter.value.DataFrameSelect = val
    }
})

onMounted(() => {
    if (!canvasRef.value) return

    canvasRef.value.width = 1200
    canvasRef.value.height = 400

    const settings: IPlotterSettings = {
        isDebug: false,
        axisSize: new Size(360, 90),
        axisStep: 20,
        xExtremum: [0, 360],
        gridAccuracy: 2,
        axisConstraint: [GridType.FixedY, GridType.FixedX],
        gridLinears: [
            GridLinear.Left,
            GridLinear.Top,
            GridLinear.Bottom,
            GridLinear.Right,
        ],
    }

    plotter.value = new Plotter('canva', settings)

    if (store.condition.length > 0) {
        plotter.value.Dataset = store.condition
        plotter.value.DataFrameSelect = store.currentFrameIndex
    }
})
</script>

<style scoped lang="scss">
.sky-plotter {
    margin: 0px;
    overflow-x: auto;
}
</style>
