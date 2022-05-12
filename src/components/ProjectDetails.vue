<template>
  <Modal
    :customContentStyle="{ backgroundColor: '#fff' }"
    @maskClick="$emit('projectClosed')"
  >
    <template v-slot:header>
      <div class="close-button">
        <button title="Close" @click="$emit('projectClosed')">
          <i class="fas fa-times fa-3x"></i>
        </button>
      </div>
    </template>
    <template v-slot:body>
      <Section class="no-padding-top" :title="project.name">
        <div class="project-links">
          <a
            class="btn btn-success"
            target="_blank"
            rel="noreferrer noopener"
            :href="project.live_demo_link"
            v-if="project.live_demo_link"
          >
            Live Demo <i class="fas fa-eye"></i>
          </a>
          <a
            class="btn btn-secondary"
            target="_blank"
            rel="noreferrer noopener"
            :href="project.source_code_link"
          >
            Source Code <i class="fas fa-code"></i>
          </a>
        </div>
        <div id="description" v-html="project.description"></div>
        <img
          class="img-fluid project-image"
          :src="project.image"
          :alt="project.name"
        />
      </Section>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal.vue';
import Section from './Section.vue';

export default {
  name: 'AppProjectDetails',
  components: {
    Modal,
    Section,
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
