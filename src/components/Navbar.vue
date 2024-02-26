<template>
  <nav
    class="navbar navbar-expand-md fixed-top navbar-dark bg-dark"
    :class="{ 'navbar-shrink': !scrollOnTop }"
  >
    <div class="container">
      <router-link class="navbar-brand" title="Home" :to="{ name: 'home' }">
        <Logo class="app-logo" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-label="Toggle navigation"
        :aria-expanded="openMenu"
        :class="{ collapsed: !openMenu }"
        @click="onNavbarTogglerClick"
      >
        {{ togglerTitle }}<font-awesome-icon class="ml-2" icon="fa-bars" />
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNavDropdown"
        :class="{ show: openMenu }"
      >
        <ul class="navbar-nav ml-auto">
          <li
            v-for="(navLink, index) in navLinks"
            :key="index"
            class="nav-item"
          >
            <router-link
              class="nav-link"
              :to="{ name: 'home', hash: navLink.link.hash }"
            >
              {{ navLink.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'AppNavbar',
  components: {
    Logo,
  },
  props: {
    togglerTitle: {
      type: String,
      default: 'Menu',
    },
    navLinks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      scrollYPosition: null,
      openMenu: false,
      scrollTimeout: null,
    };
  },
  computed: {
    scrollOnTop: function () {
      return this.scrollYPosition <= 100;
    },
    viewportOffset: function () {
      return 200;
    },
  },
  watch: {
    $route() {
      this.openMenu = false;
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.updateScroll();
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => this.updateNavLinkClass(), 125);
    });
  },
  methods: {
    updateScroll() {
      this.scrollYPosition = window.scrollY;
    },
    updateNavLinkClass() {
      this.navLinks.forEach((navLink) => {
        const element = document.querySelector(
          `[ href*="${navLink.link.hash}" ]`,
        );

        if (this.isInViewport(navLink.reference_id)) {
          element.parentElement.classList.add('active');
        } else {
          element.parentElement.classList.remove('active');
        }
      });
    },
    onNavbarTogglerClick() {
      this.openMenu = !this.openMenu;
    },
    isInViewport(id) {
      const element = document.getElementById(id);
      const bounding = element.getBoundingClientRect();

      return (
        bounding.top <= this.viewportOffset &&
        bounding.bottom >= this.viewportOffset &&
        bounding.left >= 0 &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    },
  },
};
</script>

<style scoped>
.fa-bars {
  font-size: 1.5rem;
}

.navbar.navbar-shrink {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.app-logo,
.navbar-shrink .app-logo {
  height: 3rem;
  transition: height 0.25s;
}

@media (min-width: 768px) {
  .navbar {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .app-logo {
    height: 4rem;
  }

  .navbar-nav .active > .nav-link {
    color: #fff;
    background-color: #17a2b8;
  }
}
</style>
