<template>
    <div class="sky-objects">
        <BTable
            small
            hover
            :items="store.currentCondition"
            :fields="fields"
            :tbody-tr-class="rowClass"
            :busy="store.isLoading"
            responsive="sm"
        >
            <template #cell(visible)="{ item }">
                <i :class="`bi bi-${+item.y > 0 ? 'eye' : 'eye-slash'}`"></i>
            </template>
            <template #cell(x)="{ item }">
                {{ localize(Number(item.x), 2, 2) }}
            </template>
            <template #cell(y)="{ item }">
                {{ localize(Number(item.y), 2, 2) }}
            </template>
            <template #cell(name)="{ item }">
                {{ Constants.PLANET_RUS.get(item.name) }}
            </template>
            <template #cell(phase)="{ item }">
                {{ localize(Number(store.infoByName(item.name)?.f ?? 0), 3, 3) }}
            </template>
            <template #cell(diametr)="{ item }">
                <AngularDiameter :value="store.infoByName(item.name)?.d" />
            </template>
            <template #cell(sm)="{ item }">
                <div v-b-tooltip.hover.top title="Звездная величина">
                    {{ localize(Number(store.infoByName(item.name)?.sm ?? 0), 2, 2) }}
                </div>
            </template>
            <template #table-busy>
                <div class="text-center text-primary loading">
                    <BSpinner class="align-middle" />
                    <strong>Расчет траекторий...</strong>
                </div>
            </template>
        </BTable>
    </div>
</template>

<script setup lang="ts">
import { Constants } from '~/utils/constants'

const store = useSkyStore()
const { localize } = useLocalize()

const fields = [
    { key: 'visible', label: '', class: 'v-column' },
    { key: 'name', label: 'Светило', sortable: false },
    { key: 'x', label: 'Азимут', sortable: true, class: 'column-right-align' },
    { key: 'y', label: 'Высота', sortable: true, class: 'column-right-align' },
    { key: 'sm', label: 'Блеск', class: 'column-right-align tooltip-align' },
    { key: 'diametr', label: 'Размер', class: 'column-right-align tooltip-align' },
    { key: 'phase', label: 'Фаза', class: 'column-right-align' },
]

function rowClass(item: any, type: string) {
    if (!item || type !== 'row') return
    return item.y < 0 ? 'unvisiblity-object' : 'visiblity-object'
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
        & > div {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
