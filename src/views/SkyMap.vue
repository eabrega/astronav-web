<template>
    <div class="sky-map">
        <ControlPanel />
        <TimeLine />
        <PlotterWrapper />
        <SkyObjectsTable />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ControlPanel from "@/components/ControlPanel.vue";
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
                content: "content2",
            }
        ]
    },
    components: {
        PlotterWrapper,
        ControlPanel,
        TimeLine,
        SkyObjectsTable,
    },
})
export default class SkyMap extends Vue {
    constructor() {
        super();
    }

    mounted() {
        if (this.$store.getters.condition?.length == 0) {
            this.$store?.dispatch("updateCondition");
        }
    }
}
</script>

<style lang="scss" scoped>
.sky-map {
    margin-left: 50px;
    margin-top: 25px;
    display: block;
    width: 1200px;
    flex-direction: column;
    justify-self: center;
}
</style>
