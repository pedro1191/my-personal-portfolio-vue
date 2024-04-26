<template>
  <div class="project col d-flex">
    <div class="row project-card py-3">
      <div class="col-4 thumbnail align-self-start">
        <div class="portfolio-item">
          <img class="img-fluid" :src="project.image" :alt="project.name" />
        </div>
        <!-- <button
          class="portfolio-item"
          :style="{ borderColor: randomBackgroundColor }"
          title="See Details"
          @click="$emit('projectOpened', project.id)"
        >
          <div class="portfolio-item-caption">
            <font-awesome-icon
              class="text-white"
              icon="fa-search-plus"
              size="3x"
            />
          </div>
          <img class="img-fluid" :src="project.image" :alt="project.name" />
        </button> -->
      </div>
      <div class="col-8 description">
        <h4>{{ project.name }}</h4>
        <div id="description" v-html="project.description"></div>
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
import { getRandomBackgroundColor } from '@/helpers';

export default {
  name: 'AppProject',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    randomBackgroundColor: function () {
      return getRandomBackgroundColor();
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

.portfolio-item {
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

.portfolio-item img {
  background-color: transparent;
  margin: 0;
  padding: 0;
}

.portfolio-item-caption {
  display: none;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
}

.portfolio-item:hover .portfolio-item-caption,
.portfolio-item:focus .portfolio-item-caption {
  display: flex;
}
</style>
