<template>
  <transition name="ease-in">
    <div class="update-notifier" v-if="updateExists">
      <p>There is an update available!</p>
      <button class="btn btn-info" @click="refreshApp" :disabled="refreshing">
        Refresh
      </button>
    </div>
  </transition>
  <Spinner v-if="refreshing"></Spinner>
</template>

<script>
import Spinner from '@/components/Spinner.vue';

export default {
  name: 'AppUpdateNotifier',
  components: {
    Spinner,
  },
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
  created() {
    if ('serviceWorker' in navigator) {
      document.addEventListener('swUpdated', this.showNotification, {
        once: true,
      });

      navigator.serviceWorker.addEventListener(
        'controllerchange',
        this.onControllerChange,
      );
    }
  },
  beforeUnmount() {
    if ('serviceWorker' in navigator) {
      document.removeEventListener('swUpdated', this.showNotification);

      navigator.serviceWorker.removeEventListener(
        'controllerchange',
        this.onControllerChange,
      );
    }
  },
  methods: {
    onControllerChange() {
      if (!this.refreshing) {
        this.refreshing = true;
        window.location.reload();
      }
    },
    showNotification(event) {
      this.registration = event.detail;
      this.updateExists = true;
    },
    refreshApp() {
      this.updateExists = false;

      if (this.registration && this.registration.waiting) {
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    },
  },
};
</script>

<style scoped>
.update-notifier {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  padding: 1rem;
  z-index: 100;
  border-width: var(--border-width);
  border-color: var(--secondary);
  border-style: solid;
  background-color: var(--background-color);
}

.ease-in-enter-active {
  animation: ease-in 1s;
}
.ease-in-leave-active {
  animation: ease-in 1s reverse;
}
@keyframes ease-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
