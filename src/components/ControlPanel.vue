<template>
    <div class="input-parameters">
        <b-input-group size="sm" prepend="Широта:">
            <b-form-input 
                v-model="Lat" 
                :state="isLatValid"
                type="number"
            ></b-form-input>
            <b-input-group-prepend is-text>Долгота:</b-input-group-prepend>
            <b-form-input
                v-model.number="Lon"
                :state="isLonValid"
                type="number"
                debounce="500"
            ></b-form-input>
            <b-input-group-prepend is-text>Дата:</b-input-group-prepend>
            <b-form-input
                v-model="CurrentDate"
                type="date"
                debounce="500"
                class="w-25"
            ></b-form-input>
            <b-input-group-append>
                <b-button size="sm" variant="info" @click="update">Ok</b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import DateParser from "./DateParser";
import store from "@/store";
import {
    BAlert,
    BButton,
    BButtonGroup,
    BCard,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BIcon,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BInputGroupText,
    BProgress,
} from "bootstrap-vue";

@Component
export default class ControlPanel extends Vue {
    private lat = store.state.lat;
    private lon = store.state.lon;
    private date = store.state.date;

    get CurrentDate() {
        return new DateParser(this.date).toString();
    }

    set CurrentDate(date: any) {
        store.dispatch("setDate", date);
    }

    get isLatValid(): boolean {
        return this.lat <= 90;
    }

    get isLonValid(): boolean {
        return this.lon <= 180;
    }

    set Lat(val: number) {
        this.lat = val;
        if (this.isLatValid) {
            store.dispatch("setLat", val);
        }
    }

    get Lat() {
        return this.lat;
    }

    set Lon(val: number) {
        this.lon = val;
        if (this.isLonValid) {
            store.dispatch("setLon", val);
        }
    }

    get Lon() {
        return this.lon;
    }

    update() {
        store.dispatch("updateCondition");
    }

    constructor() {
        super();
        Vue.component("b-card", BCard);
        Vue.component("b-button", BButton);
        Vue.component("b-form-input", BFormInput);
        Vue.component("b-input-group", BInputGroup);
        Vue.component("b-form-group", BFormGroup);
        Vue.component("b-form-invalid-feedback", BFormInvalidFeedback);
        Vue.component("b-input-group-append", BInputGroupAppend);
        Vue.component("b-input-group-prepend", BInputGroupPrepend);
        Vue.component("b-input-group-text", BInputGroupText);
    }
}
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";

.input-parameters {
    display: flex;
    flex-direction: row;
    .card {
        margin-left: 20px;
    }

    .input-group {
        width: 500px;
    }
    .w-25 {
        width: 19% !important;
    }
}
</style>