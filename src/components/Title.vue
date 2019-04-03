<template>
  <div :style="getWrapperStyle">
    <h1 :style="getTitleStyle">{{ title }}</h1>
    <app-divider :customStyle="getDividerStyle" />
  </div>
</template>

<script>
import Divider from './Divider.vue';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    customStyle: Object
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
    }
  },
  components: {
    appDivider: Divider
  }
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>


