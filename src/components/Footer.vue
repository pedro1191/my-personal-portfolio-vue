<template>
  <footer class="footer">
    <div class="container d-flex py-2">
      <p class="m-0">Pedro de Almeida's Portfolio {{ thisYear }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    thisYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: var(--background-color-footer);
}
</style>
