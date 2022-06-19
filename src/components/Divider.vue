<template>
  <div class="divider" :style="customStyle" data-test="divider">
    <hr />
    <font-awesome-icon class="icon" icon="fa-star-of-life" size="2x" />
  </div>
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
  margin: 0 auto;
  color: inherit;
}

.icon {
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  padding: 0 0.25em;
  margin: 0 auto;
  background-color: inherit;
}

.divider {
  padding: 2rem 0;
  background-color: inherit;
  position: relative;
}
</style>
