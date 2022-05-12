<template>
  <hr class="icon star-of-life" :style="customStyle" />
</template>

<script>
export default {
  name: 'AppDivider',
  props: {
    customStyle: Object,
  },
};
</script>

<style scoped>
hr {
  max-width: 15rem;
  border: none;
  border-top: solid 0.25rem;
  background-color: inherit;
  padding: 0;
  margin: 2rem auto;
  color: inherit;
}

.icon::before {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  background-color: inherit;
}

.star-of-life::before {
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  content: '\f621';
  position: relative;
  top: -1.6rem;
  font-size: 2rem;
  padding: 0 0.25em;
}
</style>
