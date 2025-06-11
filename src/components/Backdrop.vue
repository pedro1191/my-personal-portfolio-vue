<template>
  <div class="modal-mask" @click.self="$emit('maskClick')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppBackdrop',
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background-color-mask);
  transition: opacity 0.3s ease;
  padding: 2.5%;
  margin: 0;
  overflow: auto;
  box-sizing: border-box;
}
</style>
