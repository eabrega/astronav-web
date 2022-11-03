<template>
    <div class="angular-diameter">
        <div class="min" v-b-tooltip.hover title="Угловые минуты" v-if="value.min">
            {{ localize(value.min, 0, 2) }}'
        </div>
        <div class="sec" v-b-tooltip.hover title="Угловые секунды">
            {{ localize(value.sec, 2, 2) }}"
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IAngularDiameter from "./IAngularDiameter";
@Component
export default class AngularDiameter extends Vue{
    @Prop()
    value!: IAngularDiameter;

    constructor() {
        super();
    }
}
</script>
