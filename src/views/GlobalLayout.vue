<template>
  <div class="d-flex flex-column h-100">
    <Navbar :navLinks="navLinks" />
    <router-view class="router-view" />
    <Footer>
      <Header class="bg-dark text-muted">
        <div class="row">
          <div class="col-md-6 my-3">
            <h4 class="mb-4">LOCATION</h4>
            <p class="lead mb-0">Lisbon - Portugal.</p>
          </div>
          <div class="col-md-6 my-3">
            <h4 class="mb-4">AROUND THE WEB</h4>
            <SocialMedia :socialMedia="socialMedia" />
          </div>
        </div>
      </Header>
    </Footer>
  </div>
  <UpdateNotifier></UpdateNotifier>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import SocialMedia from '@/components/SocialMedia.vue';
import UpdateNotifier from '@/components/UpdateNotifier.vue';

export default {
  name: 'GlobalLayout',
  components: {
    Navbar,
    Footer,
    Header,
    SocialMedia,
    UpdateNotifier,
  },
  data() {
    return {
      navLinks: [
        {
          reference_id: 'portfolio',
          name: 'PORTFOLIO',
          link: { name: 'home', hash: '#portfolio' },
        },
        {
          reference_id: 'about',
          name: 'ABOUT',
          link: { name: 'home', hash: '#about' },
        },
        {
          reference_id: 'contact',
          name: 'CONTACT',
          link: { name: 'home', hash: '#contact' },
        },
      ],
      socialMedia: [
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/in/phdealmeida/',
          iconClasses: 'fa-brands fa-linkedin-in',
          iconSize: '2x',
        },
        {
          name: 'GitHub',
          link: 'https://github.com/pedro1191',
          iconClasses: 'fa-brands fa-github',
          iconSize: '2x',
        },
      ],
    };
  },
};
</script>

<style scoped>
.router-view {
  padding-top: 74px;
  /* because it is the height of the fixed navbar */
}
</style>
