<template>
    <div class="day-summary">
        date: {{ skyObject }}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class DaySummary extends Vue {
    @Prop()
    skyObject!: number;
}
</script>

<style lang="scss" scoped>
.day-summary {
    margin: {
        bottom: 2px;
    }

    background: {
        color: pink;
    }
}
</style>