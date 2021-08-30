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
        <div
            class="millisecond"
            v-b-tooltip.hover
            title="Угловые миллисекунды"
            v-if="value.millisecond"
        >
            {{ value.millisecond }}
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

<style lang="scss">
.angular-diameter {
    display: flex;

    .min {
        margin-right: 3px;
    }

    .sec {
        margin-right: 3px;
    }

    .millisecond {
        margin-right: 9px;
    }
}
</style>
