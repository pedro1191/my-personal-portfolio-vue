<template>
  <header class="header" :style="customStyle">
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

<style scoped>
.header {
  background-color: inherit;
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #fff;
  text-align: center;
}
</style>

