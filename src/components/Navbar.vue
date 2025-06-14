<template>
  <nav
    class="navbar navbar-expand-md fixed-top"
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
        {{ menuTogglerTitle }}<font-awesome-icon class="ml-2" icon="fa-bars" />
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
        <ThemeToggle :theme="theme" @toggleTheme="toggleTheme" />
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/Logo.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { useTheme } from '@/composables';

export default {
  name: 'AppNavbar',
  components: {
    Logo,
    ThemeToggle,
  },
  props: {
    menuTogglerTitle: {
      type: String,
      default: 'Menu',
    },
    navLinks: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { theme, toggleTheme } = useTheme();
    return { theme, toggleTheme };
  },
  data() {
    return {
      scrollYPosition: null,
      openMenu: false,
    };
  },
  computed: {
    scrollOnTop: function () {
      return this.scrollYPosition <= 25;
    },
  },
  watch: {
    $route() {
      this.openMenu = false;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      this.scrollYPosition = window.scrollY;
    },
    onNavbarTogglerClick() {
      this.openMenu = !this.openMenu;
    },
  },
};
</script>

<style scoped>
.fa-bars {
  font-size: 1.5rem;
}

.navbar {
  background: var(--background-with-transparency);
  border-width: var(--border-width);
  border-color: var(--border-color);
  border-style: solid;
  transition: all var(--transition-fast) ease-in-out;
}

.navbar .navbar-collapse {
  gap: 0.5rem;
}

.navbar-nav .nav-link {
  color: var(--text-color);
  border-bottom: 2px solid transparent;
  transition: all var(--transition-fast) ease-in-out;
}

.navbar.navbar-shrink {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.app-logo {
  height: 4rem;
  transition: all var(--transition-fast) ease-in-out;
}

.navbar-shrink .app-logo {
  height: 3rem;
}

@media (min-width: 768px) {
  .navbar {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .navbar-expand-md .navbar-nav {
    gap: 0.5rem;
  }

  .navbar-nav .nav-link:hover,
  .navbar-nav .active > .nav-link {
    border-bottom: 2px solid var(--text-color);
  }
}
</style>
