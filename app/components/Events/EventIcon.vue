<template>
    <div class="icon">
        <i
            :class="`bi bi-${icons.get(name)} text-${colors.get(name)}`"
            v-b-tooltip.hover.right
        ></i>
    </div>
</template>

<script setup lang="ts">
import { Constants } from '~/utils/constants'

defineProps<{ name: string }>()

const icons = Constants.EVENTS_ICONS
const colors = new Map([
    ['Sunrise', 'success'],
    ['Apogee', 'primary'],
    ['Sunset', 'danger'],
])
</script>

<style lang="scss">
.icon {
    padding-right: 15px;
    font-size: 1.1em;
}
</style>
