<template>
  <section class="container section" :style="getWrapperStyle">
    <app-title :title="title" :customStyle="getTitleStyle" v-if="title" />
    <slot></slot>
  </section>
</template>

<script>
import Title from './Title.vue';

export default {
  props: {
    title: String,
    customStyle: Object
  },
  components: {
    appTitle: Title
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
    }
  }
};
</script>

<style scoped>
.section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>

