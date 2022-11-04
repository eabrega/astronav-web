<template>
    <div class="sky-objects">
        <b-table small hover :items="$store.getters.currentCondition" :fields="FIELDS" :tbody-tr-class="isHidden"
            :busy="IS_BUSY" responsive="sm">
            <template #cell(visible)="data">
                <b-icon :icon="+data.item.y > 0 ? 'eye' : 'eye-slash'" scale="1.1"></b-icon>
            </template>
            <template #cell(x)="data">
                {{ localize(Number(data.item.x), 2, 2) }}
            </template>
            <template #cell(y)="data">
                {{ localize(Number(data.item.y), 2, 2) }}
            </template>
            <template #cell(name)="data">
                {{ SINONIMS.get(data.item.name) }}
            </template>
            <template #cell(phase)="data">
                {{ localize(Number($store.getters.info(data.item.name).f), 3, 3) }}
            </template>
            <template #cell(diametr)="data">
                <AngularDiameter :value="$store.getters.info(data.item.name).d" />
            </template>
            <template #cell(sm)="data">
                <div>
                    <div v-b-tooltip.hover.top title="Звездная величина">
                        {{ localize(Number($store.getters.info(data.item.name).sm), 2, 2) }}
                    </div>
                </div>
            </template>
            <template #table-busy>
                <div class="text-center text-primary loading">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Расчет траекторий...</strong>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Constants } from "@/store/constants";
import AngularDiameter from "@/components/Common/AngularDiameter.vue";

@Component({
    components: {
        AngularDiameter,
    },
})
export default class SkyObjectsTable extends Vue{
    constructor() {
        super();
    }

    get SINONIMS() {
        return Constants.PLANET_RUS;
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
                label: "Высота",
                sortable: true,
                class: "column-right-align",
            },
            {
                key: "sm",
                label: "Блеск",
                class: "column-right-align tooltip-align",
            },
            {
                key: "diametr",
                label: "Размер",
                class: "column-right-align tooltip-align",
            },
            {
                key: "phase",
                label: "Фаза",
                class: "column-right-align",
            },
        ];
    }

    get IS_BUSY() {
        return this.$store.getters.isLoading;
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
    --sr-only-padding-size: 20px;

    @media (max-width: 600px) {
        .v-column {
            display: none;
        }

        --sr-only-padding-size: 15px;
        font-size: 0.8em;
    }

    @media (max-width: 400px) {
        font-size: 0.7em;
    }

    th {
        &.column-right-align {
            text-align: right !important;
            padding-right: var(--sr-only-padding-size) !important;
            padding-left: 0px !important;
        }

        &.sr-only {
            display: none;
        }
    }

    .column-right-align {
        text-align: right !important;
        padding-right: var(--sr-only-padding-size) !important;
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

    .loading {
        padding-top: 40px;

        .align-middle {
            margin-right: 10px;
        }
    }

    .tooltip-align {
        &>div {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
