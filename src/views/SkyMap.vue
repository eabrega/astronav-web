<template>
    <div class="sky-map">
        <InfoBar />
        <PlotterWrapper class="plotter" />
        <TimeLine />
   
        <SkyObjectsTable class="table" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoBar from "@/components/Common/InfoBar.vue";
import PlotterWrapper from "@/components/Map/PlotterWrapper.vue";
import TimeLine from "@/components/Map/TimeLine.vue";
import SkyObjectsTable from "@/components/Map/SkyObjectsTable.vue";

@Component({
    metaInfo: {
        title: "Карта звездного неба",
        meta: [
            {
                vmid: "description",
                name: "description",
                content:
                    "Интерактивная карта звездного неба, на любой день, для любых координат наблюдателя.",
            },
        ],
    },
    components: {
        PlotterWrapper,
        TimeLine,
        SkyObjectsTable,
        InfoBar
    },
})
export default class SkyMap extends Vue {
    constructor() {
        super();
    }

    mounted() {
        if (this.$store.getters.condition?.length == 0) {
            this.$store?.dispatch("getConditions");
        }
    }
}
</script>

<style lang="scss" scoped>
.sky-map {
    .plotter {
        margin-bottom: 20px;
        overflow-x: auto;
    }

    .table {
        margin-top: 20px;
        overflow-x: auto;
    }
}
</style>
