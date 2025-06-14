<template>
  <div class="d-flex flex-column h-100">
    <Navbar :navLinks="navLinks" />
    <router-view class="container router-view" />
    <AppFooter />
  </div>
  <UpdateNotifier></UpdateNotifier>
  <CursorHighlighter></CursorHighlighter>
</template>

<script>
import AppFooter from '@/components/Footer.vue';
import CursorHighlighter from '@/components/CursorHighlighter.vue';
import Navbar from '@/components/Navbar.vue';
import UpdateNotifier from '@/components/UpdateNotifier.vue';

export default {
  name: 'GlobalLayout',
  components: {
    Navbar,
    AppFooter,
    CursorHighlighter,
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

@media (min-width: 992px) {
  .router-view {
    padding-top: 0;
  }
}
</style>
