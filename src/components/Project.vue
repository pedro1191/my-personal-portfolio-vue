<template>
  <div class="project col d-flex">
    <div class="row project-card py-3">
      <div class="col-4 thumbnail align-self-start">
        <div class="project-img-wrapper">
          <img class="img-fluid" :src="project.image" :alt="project.name" />
        </div>
      </div>
      <div class="col-8 project-details d-flex flex-column">
        <h4>{{ project.name }}</h4>
        <div
          id="description"
          class="project-description"
          v-html="project.description"
        ></div>
        <div class="project-chips">
          <AppChip v-for="chip in project.chips" :label="chip" />
        </div>
        <div class="project-links">
          <a
            class="btn btn-link"
            target="_blank"
            rel="noreferrer noopener"
            :href="project.live_demo_link"
            v-if="project.live_demo_link"
          >
            <span class="mr-1">Live Demo</span>
            <font-awesome-icon icon="fa-eye" />
          </a>
          <a
            class="btn btn-link"
            target="_blank"
            rel="noreferrer noopener"
            :href="project.source_code_link"
          >
            <span class="mr-1">Source Code</span>
            <font-awesome-icon icon="fa-code" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chip from '@/components/Chip.vue';

export default {
  name: 'AppProject',
  components: {
    AppChip: Chip,
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
.project {
  gap: 1rem;
}

.project-card:hover {
  background-color: var(--secondary20);
  border-radius: var(--border-radius);
}

.project-img-wrapper {
  display: block;
  position: relative;
  margin: 0 auto;
  outline: none;
  border: none;
  padding: 0;
  border-width: var(--border-width-thick);
  border-style: solid;
  width: 100%;
  height: 100%;
}

.project-img-wrapper img {
  background-color: transparent;
  margin: 0;
  padding: 0;
}

.project-details {
  gap: 0.5rem;
}

.project-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-links .btn:first-child {
  padding-left: 0;
}

.project-details .project-description p:last-child {
  margin-bottom: 0.5rem;
}
</style>
