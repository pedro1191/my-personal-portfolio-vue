<template>
  <div class="d-flex flex-column h-100">
    <app-navbar :navLinks="navLinks" />
    <router-view class="router-view" />
    <app-footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  data() {
    return {
      navLinks: [
        { name: 'PORTFOLIO', link: { name: 'home', hash: '#portfolio' } },
        { name: 'ABOUT', link: { name: 'home', hash: '#about' } },
        { name: 'CONTACT', link: { name: 'home', hash: '#contact' } }
      ]
    };
  },
  components: {
    appNavbar: Navbar,
    appFooter: Footer
  }
};
</script>

<style scoped>
.router-view {
  padding-top: 74px;
}
</style>
