<template>
  <div class="title" :style="getWrapperStyle">
    <h1 :style="getTitleStyle">{{ title }}</h1>
    <Divider :customStyle="getDividerStyle" />
  </div>
</template>

<script>
import Divider from './Divider.vue';

export default {
  name: 'AppTitle',
  components: {
    Divider,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
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
    getDividerStyle() {
      return this.customStyle && this.customStyle.divider
        ? this.customStyle.divider
        : {};
    },
  },
};
</script>

<style scoped>
.title {
  background-color: inherit;
}

h1 {
  font-size: 3rem;
}
</style>
