<template>
  <div class="test">
    <ControlPanel/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ControlPanel from '@/components/ControlPanel.vue'
import store from '@/store';

@Component({
  components: {
    ControlPanel
  },
})
export default class Test extends Vue {
  constructor(){
    super()
    store.dispatch('updateCondition')  
  }
}
</script>
