<template>
    <div class="home">
        <ControlPanel />
        <TimeLine />
        <PlotterWrapper />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ControlPanel from "@/components/ControlPanel.vue";
import PlotterWrapper from "@/components/PlotterWrapper.vue";
import TimeLine from "@/components/TimeLine/TimeLine.vue";
import store from "@/store";

@Component({
    components: {
        PlotterWrapper,
        ControlPanel,
        TimeLine,
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
    display: block;
    width: 1200px;
    flex-direction: column;
    justify-self: center;
}
</style>
