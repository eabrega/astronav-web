<template>
    <div class="home">
        <ControlPanel />
        <TimeLine />
        <PlotterWrapper />
        <SkyObjectsTable />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ControlPanel from "@/components/ControlPanel.vue";
import PlotterWrapper from "@/components/PlotterWrapper.vue";
import TimeLine from "@/components/TimeLine.vue";
import SkyObjectsTable from "@/components/SkyObjectsTable.vue"
import store from "@/store";

@Component({
    components: {
        PlotterWrapper,
        ControlPanel,
        TimeLine,
        SkyObjectsTable
    },
})
export default class Home extends Vue {
    constructor() {
        super();
    }
}
</script>

<style lang="scss" scoped>
.home {
    margin-left: 50px;
    margin-top: 50px;
    display: block;
    width: 1200px;
    flex-direction: column;
    justify-self: center;
}
</style>
