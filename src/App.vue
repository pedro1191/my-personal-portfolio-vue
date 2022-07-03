<template>
  <GlobalLayout />
</template>

<script>
import GlobalLayout from '@/views/GlobalLayout.vue';

export default {
  components: {
    GlobalLayout,
  },
};
</script>

<style>
@font-face {
  font-family: 'Roboto';
  src: url('./assets/fonts/Roboto-Regular.ttf');
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
