import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueGtag from 'vue-gtag';

createApp(App)
  .use(store)
  .use(router)
  .use(VueGtag, {
    config: { id: 'G-624GF25M5K' },
  })
  .mount('#app');
