<template>
  <app-modal :customContentStyle="{ backgroundColor: '#fff' }">
    <div class="close-button" slot="header">
      <button title="Close" @click="$emit('projectClosed')">
        <i class="fas fa-times fa-3x"></i>
      </button>
    </div>
    <app-section class="no-padding-top" slot="body" :title="project.name">
      <div class="project-links">
        <a class="btn btn-success" target="_blank" rel="noreferrer noopener" :href="project.live_demo_link" v-if="project.live_demo_link">Live Demo <i class="fas fa-eye"></i></a>
        <a class="btn btn-secondary" target="_blank" rel="noreferrer noopener" :href="project.source_code_link">Source Code <i class="fas fa-code"></i></a>
      </div>
      <img class="img-fluid project-image" :src="project.image" :alt="project.name">
      <div id="description" v-html="project.description"></div>
    </app-section>
  </app-modal>
</template>

<script>
import Modal from './Modal.vue';
import Section from './Section.vue';

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    appModal: Modal,
    appSection: Section
  },
  mounted() {
    const buttons = this.getButtonsFromDescription();
    this.addClickEventListeners(buttons);
  },
  methods: {
    getButtonsFromDescription() {
      return document
        .getElementById('description')
        .getElementsByTagName('button');
    },
    addClickEventListeners(buttons) {
      const vm = this;

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(event) {
          event.preventDefault();
          const id = event.target.getAttribute('data-project-id');
          vm.$emit('projectChanged', id);
        });
      }
    }
  }
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


