<template>
  <Backdrop>
    <div class="loader">
      <font-awesome-icon icon="fa-spinner" size="5x" pulse spin />
      <span class="sr-only">Loading...</span>
    </div>
  </Backdrop>
</template>

<script>
import Backdrop from '@/components/Backdrop.vue';

export default {
  name: 'AppSpinner',
  components: {
    Backdrop,
  },
};
</script>

<style scoped>
.loader {
  display: inline-flex;
  min-height: 100%;
  padding: 0;
  margin: 0;
  background-color: transparent;
  color: #fff;
  align-items: center;
  align-content: center;
}
</style>
