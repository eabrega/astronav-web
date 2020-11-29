<template>
    <div class="input-parameters">
        <b-input-group size="sm" prepend="Широта и долгота" class="mb-2">
            <b-form-input
                v-model.number="LAT"
                :state="isLatValid"
                type="number"
                aria-describedby="input-live-feedback-lat"
                aria-label="First name"
                trim
            ></b-form-input>
            <b-form-input
                v-model="lon"
                :state="isLonValid"
                type="number"
                aria-describedby="input-live-feedback-lon"
                aria-label="Last name"
                trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-lat">
                Долгота не может быть больше 90<br />
                Широта не может быть больше 180
            </b-form-invalid-feedback>
        </b-input-group>
    </div>
</template>

<script lang='ts'>
    import { Component, Vue } from "vue-property-decorator";
    import store from "@/store";
    import {
        BAlert,
        BButton,
        BCard,
        BFormGroup,
        BFormInput,
        BFormInvalidFeedback,
        BInputGroup,
        BProgress,
    } from "bootstrap-vue";

    @Component
    export default class ControlPanel extends Vue {
        private lat = store.state.lat;
        private lon = 33;

        get isLatValid(): boolean {
            return this.lat < 90;
        }

        get isLonValid(): boolean {
            return this.lon < 180;
        }

        set LAT(val: number) {
            this.lat = val;
            if (this.isLatValid) {
                store.dispatch("setLat", val);
            }
        }

        get LAT() {
            return this.lat;
        }

        constructor() {
            super();
            Vue.component("b-card", BCard);
            Vue.component("b-form-input", BFormInput);
            Vue.component("b-input-group", BInputGroup);
            Vue.component("b-form-group", BFormGroup);
            Vue.component("b-form-invalid-feedback", BFormInvalidFeedback);
        }
    }
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";

.input-parameters {
    padding-left: 20px;
    display: flex;
    flex-direction: row;
    .card {
        width: 320px;
        margin-left: 20px;
    }

    .input-group {
        width: 350px;
    }
}
</style>