<template>
  <nav
    class="navbar navbar-expand-md fixed-top navbar-dark bg-dark"
    :class="{ 'navbar-shrink': !scrollOnTop }"
  >
    <div class="container">
      <a class="navbar-brand" title="Home" href="#home">
        <Logo class="app-logo" />
      </a>
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
        {{ togglerTitle }}<i class="fas fa-bars ml-2"></i>
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
            <a :href="navLink.link.hash" class="nav-link">{{ navLink.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from './Logo.vue';

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
      hashLinks: [],
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
      this.updateNavLinkClass();
    });

    this.addSmoothScrollOnAnchorClick();
  },
  methods: {
    updateScroll() {
      this.scrollYPosition = window.scrollY;
    },
    updateNavLinkClass() {
      for (let i = 0; i < this.hashLinks.length; i++) {
        const element = document.querySelector(
          `[ href="#${this.hashLinks[i]}" ]`
        );

        if (this.isInViewport(this.hashLinks[i])) {
          element.parentElement.classList.add('active');
        } else {
          element.parentElement.classList.remove('active');
        }
      }
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
    scroll(from, to, hash, html, body) {
      const timeInterval = 1; // in ms
      let prevScrollTop;
      const increment = to > from ? 20 : -20;

      const scrollByPixel = setInterval(function () {
        const scrollTop = Math.round(body.scrollTop || html.scrollTop); // getting current scroll position

        if (
          prevScrollTop == scrollTop ||
          (to > from && scrollTop >= to) ||
          (to < from && scrollTop <= to)
        ) {
          clearInterval(scrollByPixel);

          window.location.hash = hash; // Add hash to the url after scrolling
        } else {
          body.scrollTop += increment;
          html.scrollTop += increment;

          prevScrollTop = scrollTop;
        }
      }, timeInterval);
    },
    onAnchorClick(event, html, body, hash, hashElement) {
      const scrollTop = Math.round(body.scrollTop || html.scrollTop); // getting current scroll position

      event.preventDefault(); // preventing default anchor click behavior

      let hashElementTop = 0;
      let obj = hashElement;

      while (obj.offsetParent) {
        hashElementTop += obj.offsetTop;
        obj = obj.offsetParent;
      }

      hashElementTop = Math.round(hashElementTop); // getting element's position

      this.scroll(scrollTop, hashElementTop, hash, html, body);
    },
    addSmoothScrollOnAnchorClick() {
      const links = document.links;
      const html = document.documentElement;
      const body = document.body;

      for (let i = 0; i < links.length; i++) {
        const href = links[i].getAttribute('href');
        const id = href.substring(1);
        const hashElement = document.getElementById(id);

        if (hashElement) {
          this.hashLinks.push(id);
          links[i].onclick = (event) =>
            this.onAnchorClick(event, html, body, href, hashElement);
        }
      }
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
