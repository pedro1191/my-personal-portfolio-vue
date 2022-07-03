<template>
  <div class="row">
    <Project
      v-for="(project, index) in projects"
      :key="index"
      :project="project"
      @projectOpened="onOpenProject($event)"
    />
    <ProjectDetails
      :project="selectedProject"
      v-if="openProjectDetails"
      @projectClosed="onProjectClose"
    />
  </div>
</template>

<script>
import Project from '@/components/Project.vue';
import ProjectDetails from '@/components/ProjectDetails.vue';

export default {
  name: 'AppPortfolio',
  components: {
    Project,
    ProjectDetails,
  },
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openProjectDetails: false,
      selectedProject: null,
    };
  },
  methods: {
    onOpenProject(id) {
      document.querySelector('html').style.overflow = 'hidden';
      this.setSelectedProject(id);
      this.openProjectDetails = true;
    },
    onProjectClose() {
      document.querySelector('html').style.overflow = 'auto';
      this.openProjectDetails = false;
    },
    setSelectedProject(id) {
      this.selectedProject = this.projects.find((project) => project.id === id);
    },
  },
};
</script>
