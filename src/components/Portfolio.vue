<template>
  <div class="row">
    <app-project v-for="(project, index) in projects" :key="index" :project="project" @projectOpened="onOpenProject($event)" />
    <app-project-details :project="selectedProject" v-if="openProjectDetails" @projectClosed="onProjectClose" @projectChanged="setSelectedProject($event)" />
  </div>
</template>

<script>
import Project from './Project.vue';
import ProjectDetails from './ProjectDetails.vue';

export default {
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      openProjectDetails: false,
      selectedProject: null
    };
  },
  components: {
    appProject: Project,
    appProjectDetails: ProjectDetails
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
      this.selectedProject = this.projects.filter(project => {
        return project.id == id;
      })[0];
    }
  }
};
</script>

