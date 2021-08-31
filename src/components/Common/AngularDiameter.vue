<template>
    <div class="angular-diameter">
        <div
            class="min"
            v-b-tooltip.hover
            title="Угловые минуты"
            v-if="value.min"
        >
            {{ value.min }}'
        </div>
        <div class="sec" v-b-tooltip.hover title="Угловые секунды">
            {{ value.sec }}"
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IAngularDiameter from "./AngularDiameter";

@Component
export default class AngularDiameter extends Vue {
    @Prop()
    value!: IAngularDiameter;

    constructor() {
        super();
    }
}
</script>
