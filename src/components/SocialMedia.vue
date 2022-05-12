<template>
  <div class="social-media">
    <a
      v-for="(sm, index) in socialMedia"
      :key="index"
      :href="sm.link"
      :class="sm.anchorClasses"
      target="_blank"
      rel="noreferrer noopener"
    >
      <i :class="sm.iconClasses" :title="sm.name"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    socialMedia: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.social-media {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.social-media a {
  text-decoration: none;
  color: inherit;
  margin: 0 0.5rem;
  color: #6c757d;
}

.social-media a:hover,
.social-media a:active {
  color: #fff;
}
</style>
