<template>
  <transition name="zoom-in">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'AppZoomAnimation',
};
</script>

<style scoped>
.zoom-in-enter-active {
  animation: zoom-in 0.25s;
}
.zoom-in-leave-active {
  animation: zoom-in 0.25s reverse;
}
@keyframes zoom-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
