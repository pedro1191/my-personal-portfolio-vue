<template>
  <ProjectDetailsModal
    :customContentStyle="{ backgroundColor: '#fff' }"
    @close="$emit('projectClosed')"
  >
    <AppSection class="no-padding-top" :title="project.name">
      <div class="project-links">
        <a
          class="btn btn-success"
          target="_blank"
          rel="noreferrer noopener"
          :href="project.live_demo_link"
          v-if="project.live_demo_link"
        >
          Live Demo <font-awesome-icon icon="fa-eye" />
        </a>
        <a
          class="btn btn-secondary"
          target="_blank"
          rel="noreferrer noopener"
          :href="project.source_code_link"
        >
          Source Code <font-awesome-icon icon="fa-code" />
        </a>
      </div>
      <div id="description" v-html="project.description"></div>
      <img
        class="img-fluid project-image"
        :src="project.image"
        :alt="project.name"
      />
    </AppSection>
  </ProjectDetailsModal>
</template>

<script>
import ProjectDetailsModal from '@/components/ProjectDetailsModal.vue';
import AppSection from '@/components/Section.vue';

export default {
  name: 'AppProjectDetails',
  components: {
    ProjectDetailsModal,
    AppSection,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.close-button {
  padding: 15px 15px 0 15px;
  width: 100%;
  text-align: right;
}

.close-button button {
  border: none;
  outline: none;
  background-color: transparent;
  color: #17a2b8;
}

.close-button button:hover,
.close-button button:focus {
  color: #117a8b;
}

#description {
  text-align: center;
  margin: 2rem 1rem;
}

.project-links a {
  color: #fff;
  margin: 0.5rem;
  cursor: pointer;
}

.no-padding-top {
  padding-top: 0;
}

.project-image {
  border-width: 0.5rem;
  border-style: double;
  border-color: #17a2b8;
}
</style>
