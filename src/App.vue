<template>
  <div id="app" class="h-100">
    <GlobalLayout />
  </div>
</template>

<script>
import GlobalLayout from './views/GlobalLayout.vue';

export default {
  components: {
    GlobalLayout,
  },
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
