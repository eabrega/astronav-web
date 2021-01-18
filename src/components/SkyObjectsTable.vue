<template>
    <div class="sky-objects-table">
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
        </b-table>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Vue, Watch } from "vue-property-decorator";
import { BTable, BootstrapVueIcons } from "bootstrap-vue";

@Component
export default class SkyObjectsTable extends Vue {
    private conditionIsLoaded: boolean = false;
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
        let table = store.getters.currentCondition;
        return table;
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
                label: "Небесное тело",
                sortable: false,
                class: "test2",
            },
            {
                key: "x",
                label: "Азимут",
                sortable: true,
                class: "test",
            },
            {
                key: "y",
                label: "Угол места",
                sortable: true,
                class: "test",
            },
        ];
    }

    isHidden(item: any, type: any) {
        if (!item || type !== "row") return;
        if (item.y < 0) return "unvisiblity-object";
        else return "visiblity-object";
    }
}
</script>
<style lang="scss">
.sky-objects-table {
    margin-top: 30px;
    width: 600px;
}

.test {
    text-align: right !important;
    padding-right: 20px !important;
}
.test2 {
    text-align: left !important;
    padding-right: 20px !important;
}

.num {
    width: 50px;
}
tr td,
th {
    padding-left: 20px !important;
    padding-right: 20px !important;
}

.visiblity-object {
    color: black;
    font-weight: 500;
}

.unvisiblity-object {
    color: rgb(43, 41, 41);
    font-weight: 400;
}
</style>
