<template>
    <div class="summary">
        <InfoBar />
        <!-- <div class="summaries"> -->
        <DaySummary v-for="(i, index) in events" :key="index" :event="i"></DaySummary>
        <!-- </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoBar from "@/components/Common/InfoBar.vue";
import DaySummary from '@/components/Summary/DaySummary.vue'
import { IDrawObject } from "@/components/Plotter/drawObject";

@Component({
    metaInfo: {
        title: "Сводка",
        meta: [
            {
                vmid: "summary",
                name: "summary",
                content: ""
            }
        ],
    },
    components: {
        InfoBar,
        DaySummary
    }
})
export default class Summary extends Vue {
    DATE(i: number) {
        let date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    }

    events: Array<Array<IDrawObject>> = [
        [{ x: 100, y: 10, name: "a" }, { x: 200, y: 20, name: "b" }],
        [{ x: 100, y: 10, name: "a" }, { x: 200, y: 10, name: "b" }],
        [{ x: 100, y: 10, name: "a" }, { x: 200, y: 30, name: "b" }],
        [{ x: 100, y: 5, name: "a" }, { x: 200, y: 25, name: "b" }, { x: 150, y: 15, name: "b" }],
        [{ x: 100, y: 10, name: "a" }, { x: 200, y: 20, name: "b" }],
        [{ x: 100, y: 10, name: "a" }, { x: 200, y: 10, name: "b" }],
        [{ x: 100, y: 10, name: "a" }, { x: 200, y: 30, name: "b" }],
        [{ x: 100, y: 5, name: "a" }, { x: 200, y: 25, name: "b" }, { x: 150, y: 15, name: "b" }],
        [{ x: 100, y: 10, name: "a" }, { x: 200, y: 20, name: "b" }],
        [{ x: 100, y: 10, name: "a" }, { x: 200, y: 10, name: "b" }],

    ];

};
</script>

<style lang="scss">
</style>

