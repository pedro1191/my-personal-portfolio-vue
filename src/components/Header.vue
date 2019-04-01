<template>
  <app-navbar />
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  name: 'header',
  components: {
    appNavbar: Navbar
  }
};
</script>
