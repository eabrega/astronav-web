<template>
    <div class="sky-map">
        <PlotterWrapper />
        <TimeLine />
        <SkyObjectsTable class="table" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
    max-width: var(--max-size);
    min-width: calc(var(--min-size) - var(--main-margin));
    margin-left: var(--main-margin);
    display: block;
    flex-direction: column;
    justify-self: center;

    .table {
        margin-top: 20px;
        overflow-x: auto;
    }
}
</style>
