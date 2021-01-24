<template>
    <div class="sky-objects">
        <b-table
            small
            hover
            :items="ITEMS"
            :fields="FIELDS"
            :tbody-tr-class="isHidden"
            responsive="sm"
        >
            <template #cell(visible)="data">
                <b-icon
                    :icon="+data.item.y > 0 ? 'eye' : 'eye-slash'"
                    scale="1.1"
                ></b-icon>
            </template>
            <template #cell(x)="data">
                {{ data.item.x.toFixed(2) }}
            </template>
            <template #cell(y)="data">
                {{ data.item.y.toFixed(2) }}
            </template>
            <template #cell(name)="data">
                {{ SINONIMS.get(data.item.name) }}
            </template>
            <template #cell(phase)="data">
                {{ getF(data.item.name).toFixed(2) }}
            </template>
            <template #cell(diametr)="data">
                {{ getD(data.item.name).toFixed(2) }}
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Vue } from "vue-property-decorator";
import { BTable, BootstrapVueIcons } from "bootstrap-vue";
import { ISkyInfo, ISkyInfoItem } from "@/store/ISkyInfo";
@Component
export default class SkyObjectsTable extends Vue {
    private readonly sinonims = new Map([
        ["Mercury", "Меркурий"],
        ["Venus", "Венера"],
        ["Mars", "Марс"],
        ["Jupiter", "Юпитер"],
        ["Saturn", "Сатурн"],
        ["Moon", "Луна"],
        ["Sun", "Солнце"],
    ]);

    constructor() {
        super();
        Vue.use(BootstrapVueIcons);
        Vue.component("b-table", BTable);
    }

    get SINONIMS() {
        return this.sinonims;
    }

    get ITEMS() {
        return store.getters.currentCondition;
    }

    get INFO(): Array<ISkyInfoItem> {
        return store.getters.info;
    }

    get FIELDS() {
        return [
            {
                key: "visible",
                label: "",
                class: "v-column",
            },
            {
                key: "name",
                label: "Светило",
                sortable: false,
            },
            {
                key: "x",
                label: "Азимут",
                sortable: true,
                class: "column-right-align",
            },
            {
                key: "y",
                label: "Угол места",
                sortable: true,
                class: "column-right-align",
            },
            {
                key: "diametr",
                label: "Размер",
                class: "column-right-align",
            },
            {
                key: "phase",
                label: "Фаза",
                class: "column-right-align",
            },
        ];
    }

    getF(str: string): number {
        return this.INFO?.find((i) => i.name == str)?.f ?? 0;
    }

    getD(str: string): number {
        return this.INFO?.find((i) => i.name == str)?.d ?? 0;
    }

    isHidden(item: any, type: any) {
        if (!item || type !== "row") return;
        if (item.y < 0) return "unvisiblity-object";
        else return "visiblity-object";
    }
}
</script>
<style lang="scss">
.sky-objects {
    margin-top: 30px;
    width: 600px;

    .column-right-align {
        text-align: right !important;
        padding-right: 20px !important;
        padding-left: 0px !important;
    }

    .visiblity-object {
        color: black;
        font-weight: 500;
    }

    .unvisiblity-object {
        color: rgba(43, 41, 41, 0.5);
        font-weight: 500;
    }
    
    .v-column {
        width: 30px;
    }
}
</style>
