<template>
  <img alt="logo" :src="appLogo" class="default" :style="customStyle">
</template>

<script>
import appLogo from '../assets/whiteLogo.png';

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
  height: 50px;
}
</style>

