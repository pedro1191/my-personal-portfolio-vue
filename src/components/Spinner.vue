<template>
  <div class="loader">
    <font-awesome-icon icon="fa-spinner" size="5x" pulse spin />
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'AppSpinner',
};
</script>

<style scoped>
.loader {
  color: #fff;
}
</style>
