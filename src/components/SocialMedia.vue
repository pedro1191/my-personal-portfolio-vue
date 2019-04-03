<template>
  <div class="social-media text-muted">
    <a v-for="(sm, index) in socialMedia" :key="index" :href="sm.link" target="_blank" rel="noreferrer noopener">
      <i :class="sm.iconClass" :title="sm.name"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    socialMedia: {
      type: Array,
      required: true
    }
  }
};
</script>


<style scoped>
.social-media {
  display: flex;
  align-content: center;
  align-items: center;
}

.social-media a {
  text-decoration: none;
  color: inherit;
  margin: 0 0.5rem;
}

.social-media a:hover,
.social-media a:active {
  color: #fff;
}
</style>
