<template>
  <div class="d-flex flex-column h-100">
    <app-navbar :navLinks="navLinks" />
    <router-view class="router-view" />
    <app-footer>
      <app-header class="bg-dark text-muted">
        <div class="row">
          <div class="col-md-6 my-3">
            <h4 class="mb-4">LOCATION</h4>
            <p class="lead mb-0">Recife/PE - Brazil.</p>
          </div>
          <div class="col-md-6 my-3">
            <h4 class="mb-4">AROUND THE WEB</h4>
            <app-social-media :socialMedia="socialMedia" />
          </div>
        </div>
      </app-header>
    </app-footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import SocialMedia from '../components/SocialMedia.vue';

export default {
  data() {
    return {
      navLinks: [
        { name: 'PORTFOLIO', link: { name: 'home', hash: '#portfolio' } },
        { name: 'ABOUT', link: { name: 'home', hash: '#about' } },
        { name: 'CONTACT', link: { name: 'home', hash: '#contact' } }
      ],
      socialMedia: [
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/in/phdealmeida/',
          iconClasses: 'fab fa-linkedin-in fa-2x'
        },
        {
          name: 'GitHub',
          link: 'https://github.com/pedro1191',
          iconClasses: 'fab fa-github fa-2x'
        }
      ]
    };
  },
  components: {
    appNavbar: Navbar,
    appFooter: Footer,
    appHeader: Header,
    appSocialMedia: SocialMedia
  }
};
</script>

<style scoped>
.router-view {
  padding-top: 74px; /* because it is the height of the fixed navbar */
}
</style>
