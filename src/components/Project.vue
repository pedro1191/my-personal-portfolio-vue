<template>
  <div class="col-md-6 col-lg-4 my-2">
    <button
      class="portfolio-item"
      :style="{ borderColor: randomBackgroundColor }"
      title="See Details"
      @click="$emit('projectOpened', project.id)"
    >
      <div class="portfolio-item-caption">
        <i class="fas fa-search-plus fa-3x text-white"></i>
      </div>
      <img class="img-fluid" :src="project.image" :alt="project.name" />
    </button>
  </div>
</template>

<script>
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
      const min = Math.ceil(100000);
      const max = Math.floor(999999);
      const hexColor = `#${Math.floor(Math.random() * (max - min)) + min}`;
      return hexColor;
    },
  },
};
</script>

<style scoped>
.portfolio-item {
  display: block;
  position: relative;
  margin: 0 auto;
  outline: none;
  border: none;
  padding: 0;
  border-width: 0.5rem;
  border-style: double;
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
