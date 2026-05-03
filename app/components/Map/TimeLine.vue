<template>
    <div class="time-line">
        <BInputGroup size="sm" class="time-line__height">
            <template #prepend>
                <BInputGroupText class="fw-bold">UTC{{ store.timeZone }}</BInputGroupText>
                <BInputGroupText>{{ store.displayTime }}</BInputGroupText>
            </template>
            <BFormInput
                class="time-line__height"
                size="sm"
                type="range"
                v-model.number="frameId"
                min="0"
                :max="maxLength"
            />
        </BInputGroup>
    </div>
</template>

<script setup lang="ts">
const store = useSkyStore()

const frameId = computed({
    get() {
        return store.currentFrameIndex
    },
    set(val: number) {
        store.setCurrentFrameId(Number(val))
    },
})

const maxLength = computed(() =>
    Math.max(0, store.condition.length - 1).toString()
)
</script>

<style lang="scss" scoped>
.time-line {
    @media (max-width: 600px) {
        &__height {
            height: 45px;
        }
    }

    @media print {
        display: none;
    }

    margin-top: 5px;
}
</style>
