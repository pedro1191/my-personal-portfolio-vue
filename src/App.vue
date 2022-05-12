<template>
  <div id="app" class="h-100">
    <app-global-layout />
  </div>
</template>

<script>
import GlobalLayout from './views/GlobalLayout.vue';

export default {
  components: {
    appGlobalLayout: GlobalLayout
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
