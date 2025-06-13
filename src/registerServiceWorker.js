import { registerSW } from 'virtual:pwa-register';

registerSW({
  onRegistered() {
    console.info('Service worker has been registered.');
  },
  onRegisterError(error) {
    console.error('Error during service worker registration:', error);
  },
  onNeedRefresh() {
    console.info('New content is available; please refresh.');
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration?.waiting) {
        document.dispatchEvent(
          new CustomEvent('swUpdated', { detail: registration }),
        );
      } else {
        console.warn('onNeedRefresh: No waiting SW found.');
      }
    });
  },
  onOfflineReady() {
    console.info(
      'No internet connection found. App is running in offline mode.',
    );
  },
});
