<template>
  <img alt="logo" :src="appLogo" class="default" :style="customStyle">
</template>

<script>
import appLogo from '../assets/profile.png';

export default {
  name: 'logo',
  data() {
    return {
      appLogo
    };
  },
  props: {
    customStyle: Object
  }
};
</script>

<style scoped>
.default {
  background-color: #e3f2fd;
  border-radius: 50%;
}
</style>

