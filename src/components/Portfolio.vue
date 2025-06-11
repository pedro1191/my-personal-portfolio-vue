<template>
  <div class="portfolio row flex-column">
    <Project
      v-for="(project, index) in projects"
      :key="index"
      :project="project"
    />
  </div>
</template>

<script>
import Project from '@/components/Project.vue';

export default {
  name: 'AppPortfolio',
  components: {
    Project,
  },
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.portfolio {
  gap: 1rem;
}
</style>
