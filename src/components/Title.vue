<template>
  <div class="title">
    <component :is="isSecondary ? 'h2' : 'h1'">
      {{ title }}
    </component>
  </div>
</template>

<script>
export default {
  name: 'AppTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
    isSecondary: Boolean,
  },
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>
