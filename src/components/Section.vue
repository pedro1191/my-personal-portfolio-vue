<template>
  <section class="section" :style="getWrapperStyle">
    <div class="container">
      <Title :title="title" :customStyle="getTitleStyle" v-if="title" />
      <slot></slot>
    </div>
  </section>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  name: 'AppSection',
  components: {
    Title,
  },
  props: {
    title: String,
    customStyle: Object,
  },
  computed: {
    getWrapperStyle() {
      return this.customStyle && this.customStyle.wrapper
        ? this.customStyle.wrapper
        : {};
    },
    getTitleStyle() {
      return this.customStyle && this.customStyle.title
        ? this.customStyle.title
        : {};
    },
  },
};
</script>

<style scoped>
.section {
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: inherit;
}

.section div {
  background-color: inherit;
}
</style>
