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

html {
  scrollbar-gutter: stable;
}

body {
  color: var(--text-color);
  background-color: var(--background-color);
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
