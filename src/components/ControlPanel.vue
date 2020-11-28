<template>
    <div>
        <b-alert show>Default Alert</b-alert>
        <b-alert variant="success" show>Success Alert</b-alert>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            Dismissible Alert!
        </b-alert>
        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="warning"
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
        >
            <p>
                This alert will dismiss after {{ dismissCountDown }} seconds...
            </p>
            <!-- <b-progress :value="dismissCountDown" :max="dismissSecs" show-progress animated></b-progress> -->
            <b-progress
                variant="warning"
                :max="dismissSecs"
                :value="dismissCountDown"
                height="4px"
            ></b-progress>
        </b-alert>

        <b-button @click="showAlert" variant="info" class="m-1">
            Show alert with count-down timer
        </b-button>
        <b-button
            @click="showDismissibleAlert = true"
            variant="info"
            class="m-1"
        >
            Show dismissible alert ({{
                showDismissibleAlert ? "visible" : "hidden"
            }})
        </b-button>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { BAlert, BButton, BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { BProgress } from "bootstrap-vue";

@Component
export default class ControlPanel extends Vue {
    dismissSecs = 10;
    dismissCountDown = 0;
    showDismissibleAlert = false;

    countDownChanged(dismissCountDown: number) {
        this.dismissCountDown = dismissCountDown;
    }

    showAlert() {
        this.dismissCountDown = this.dismissSecs;
    }

    constructor() {
        super();
        Vue.component("b-progress", BProgress);
        Vue.component("b-alert", BAlert);
        Vue.component("b-button", BButton)
        //Vue.use(BootstrapVue);
        // Vue.use(IconsPlugin);
    }
}
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
</style>