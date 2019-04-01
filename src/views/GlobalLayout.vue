<template>
  <div>
    <app-header />
    <router-view />
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  name: 'globalLayout',
  components: {
    appHeader: Header
  }
};
</script>
