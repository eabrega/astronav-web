<template>
    <div class="angular-diameter">
        <div
            class="min"
            v-b-tooltip.hover
            title="Угловые минуты"
            v-if="value?.min"
        >
            {{ localize(value.min, 0, 2) }}'
        </div>
        <div class="sec" v-b-tooltip.hover title="Угловые секунды">
            {{ localize(value?.sec ?? 0, 2, 2) }}"
        </div>
    </div>
</template>

<script setup lang="ts">
import type IAngularDiameter from '~/types/IAngularDiameter'

defineProps<{ value: IAngularDiameter }>()

const { localize } = useLocalize()
</script>
