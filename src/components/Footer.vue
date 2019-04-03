<template>
  <footer class="mt-auto bg-dark-secondary">
    <slot></slot>
    <div class="container d-flex py-3">
      <p class="m-0 text-muted">Pedro de Almeida's Portfolio {{ thisYear }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    thisYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style scoped>
.bg-dark-secondary {
  background-color: #1a252f;
}
</style>

