<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import store from '@/store';

@Component({
  components: {
    HelloWorld
  },
})
export default class Home extends Vue {
  constructor(){
    super() 
  }
}
</script>
