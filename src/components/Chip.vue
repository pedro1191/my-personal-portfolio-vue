<template>
  <div class="chip">
    <span>{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'AppChip',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.chip {
  padding: 0 0.5rem;
  border-width: var(--border-width);
  border-color: var(--border-color);
  border-style: solid;
  background-color: var(--background-color-chip);
  border-radius: var(--border-radius-full-rounded);
}
</style>
