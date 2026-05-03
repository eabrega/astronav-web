<template>
    <div class="sky-map">
        <InfoBar />
        <ClientOnly>
            <PlotterWrapper class="plotter" />
        </ClientOnly>
        <TimeLine />
        <ClientOnly>
            <SkyObjectsTable class="table" />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Карта звездного неба',
    meta: [
        {
            name: 'description',
            content:
                'Интерактивная карта звездного неба, на любой день, для любых координат наблюдателя.',
        },
    ],
})

const store = useSkyStore()

onMounted(() => {
    if (store.condition.length === 0) {
        store.getConditions()
    }
})
</script>

<style lang="scss" scoped>
.sky-map {
    .plotter {
        margin-bottom: 20px;
    }

    .table {
        margin-top: 20px;
        overflow-x: auto;
    }
}
</style>
