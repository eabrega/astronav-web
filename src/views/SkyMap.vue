<template>
    <div class="sky-map">
        <PlotterWrapper class="plotter" />
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

    .plotter {
        margin-bottom: 20px;
        overflow-x: auto;
    }

    ::-webkit-scrollbar-track {
        background-color: rgba(0, 140, 255, 0.158);
        box-shadow: 0px 0px 3px rgb(190, 190, 190) inset;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background-color: #42b983;
        box-shadow: 0px 1px 1px rgb(190, 190, 190) inset;
        background-position: center;
        background-repeat: no-repeat;
    }

    ::-webkit-scrollbar {
        height: 15px;
    }

    .table {
        margin-top: 20px;
        overflow-x: auto;
    }
}
</style>
