<template>
  <div class="input-parameters">
    <b-input-group size="sm" prepend="Широта и долгота" class="mb-2">
      <b-form-input
        v-model.number="Lat"
        :state="isLatValid"
        type="number"
        aria-describedby="input-live-feedback-lat"
        aria-label="First name"
        trim
      ></b-form-input>
      <b-form-input
        v-model.number="Lon"
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
      <b-input-group-prepend is-text>Дата:</b-input-group-prepend>
      <b-form-input
        v-model="getDate"
        type="date"
        aria-label="Last name"
        trim
      ></b-form-input>
      <b-input-group-append append="Username">
        <b-button size="sm">Ok</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import { DateParser } from "./DateParser";
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

  get getDate() {
    return "2020-10-22";
  }

  get isLatValid(): boolean {
    return this.lat < 90;
  }

  get isLonValid(): boolean {
    return this.lon < 180;
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
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  .card {
    width: 320px;
    margin-left: 20px;
  }

  .input-group {
    width: 600px;
  }
  .valid-feedback.feedback-icon,
  .invalid-feedback.feedback-icon {
    position: absolute;
    width: auto;
    bottom: 10px;
    right: 10px;
    margin-top: 0;
  }
}
</style>