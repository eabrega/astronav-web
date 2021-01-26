<template>
    <div class="schedule">
        <h1>Сегодня в программе</h1>
        <p>Регулярные события</p>
    </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
@Component 
export default class Schedule extends Vue {
    constructor() {
        super();
    }

    mounted() {
       // if (this.$store.getters.condition?.length == 0) {
            this.$store?.dispatch("getEvents");
       // }
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
