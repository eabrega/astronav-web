<template>
    <div class="schedule">
        <h1>Сегодня в программе</h1>
        <div v-for="(item, index) in EVENTS">
            <Planet :skyObject="item" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Planet from "@/components/Planet.vue";
import { ISkyEvent } from "@/store/ISkyInfo";

@Component({
    components: {
        Planet,
    },
})
export default class Schedule extends Vue {
    constructor() {
        super();
    }

    get EVENTS(): Array<ISkyEvent> {
        return this.$store.getters.events;
    }

    mounted() {
        if (this.$store.getters.condition?.length == 0) {
            this.$store?.dispatch("getEvents");
        }
    }
}
</script>

<style lang="scss">
.schedule {
    margin-left: 50px;
    display: block;
    width: 1200px;
    flex-direction: column;
    justify-self: center;
}
</style>
