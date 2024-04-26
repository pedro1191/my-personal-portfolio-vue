<template>
  <header class="header" :style="customStyle">
    <div class="container">
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    customStyle: Object,
  },
};
</script>
