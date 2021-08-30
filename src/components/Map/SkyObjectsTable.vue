<template>
    <div class="sky-objects">
        <b-table
            small
            hover
            :items="$store.getters.currentCondition"
            :fields="FIELDS"
            :tbody-tr-class="isHidden"
            :busy="IS_BUSY"
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
                {{ $store.getters.info(data.item.name).f.toFixed(2) }}
            </template>
            <template #cell(diametr)="data">
                <AngularDiameter :value="$store.getters.info(data.item.name).d"/>
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
import { Locale } from "@/store/constants";
import AngularDiameter from "@/components/Common/AngularDiameter.vue";

@Component({
    components: {
        AngularDiameter,
    },
})
export default class SkyObjectsTable extends Vue {
    constructor() {
        super();
    }

    get SINONIMS() {
        return Locale.PLANET_RUS;
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
                class: "diameter",
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
    @media (max-width: 600px) {
        .v-column {
            display: none;
        }

        font-size: 0.8em;
    }

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

    .b-table[aria-busy="true"] {
        opacity: 0.6;
    }

    .loading {
        padding-top: 40px;
        .align-middle {
            margin-right: 10px;
        }
    }

    .diameter div{
        display: flex;
        justify-content: flex-end;
    }
}
</style>
