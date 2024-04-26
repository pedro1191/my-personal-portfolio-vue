<template>
  <img alt="logo" :src="appLogo" class="default" :style="customStyle" />
</template>

<script>
import appLogo from '@/assets/profile.png';

export default {
  name: 'AppLogo',
  props: {
    customStyle: Object,
  },
  data() {
    return {
      appLogo,
    };
  },
};
</script>

<style scoped>
.default {
  border: 1px solid var(--secondary);
  background-color: var(--background-with-transparency);
  border-radius: 50%;
}
</style>
