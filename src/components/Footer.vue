<template>
  <footer class="mt-auto bg-dark-secondary">
    <div class="container d-flex py-3">
      <p class="m-0 text-muted">Pedro de Almeida's Portfolio {{ thisYear }}</p>
      <app-social-media class="ml-auto" :socialMedia="socialMedia" />
    </div>
  </footer>
</template>

<script>
import Header from './Header.vue';
import SocialMedia from './SocialMedia.vue';

export default {
  data() {
    return {
      socialMedia: [
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/in/phdealmeida/',
          iconClass: 'fab fa-linkedin-in'
        },
        {
          name: 'GitHub',
          link: 'https://github.com/pedro1191',
          iconClass: 'fab fa-github'
        }
      ]
    };
  },
  computed: {
    thisYear() {
      return new Date().getFullYear();
    }
  },
  components: {
    appHeader: Header,
    appSocialMedia: SocialMedia
  }
};
</script>

<style scoped>
.bg-dark-secondary {
  background-color: #1a252f;
}
</style>

