<template>
  <div class="d-flex flex-column h-100">
    <Navbar :navLinks="navLinks" />
    <router-view class="container router-view" />
    <AppFooter />
  </div>
  <UpdateNotifier></UpdateNotifier>
</template>

<script>
import AppFooter from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import UpdateNotifier from '@/components/UpdateNotifier.vue';

export default {
  name: 'GlobalLayout',
  components: {
    Navbar,
    AppFooter,
    UpdateNotifier,
  },
  data() {
    return {
      navLinks: [
        {
          reference_id: 'portfolio',
          name: 'Projects',
          link: { name: 'home', hash: '#portfolio' },
        },
        {
          reference_id: 'about',
          name: 'About',
          link: { name: 'home', hash: '#about' },
        },
        {
          reference_id: 'contact',
          name: 'Contact',
          link: { name: 'home', hash: '#contact' },
        },
      ],
    };
  },
};
</script>

<style scoped>
.router-view {
  padding-top: var(--navbar-height-mobile);
  flex: 1;
}

@media (min-width: 768px) {
  .router-view {
    padding-top: var(--navbar-height);
  }
}
</style>
