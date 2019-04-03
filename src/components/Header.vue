<template>
  <header class="bg-info text-white text-center py-5" :style="customStyle">
    <div class="container">
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    customStyle: Object
  }
};
</script>
