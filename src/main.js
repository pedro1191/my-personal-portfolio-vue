import { createApp } from 'vue';
import {
  faBars,
  faCode,
  faEye,
  faSearchPlus,
  faSpinner,
  faStarOfLife,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueGtag from 'vue-gtag';

library.add(
  faBars,
  faCode,
  faEye,
  faGithub,
  faLinkedinIn,
  faSearchPlus,
  faSpinner,
  faStarOfLife,
  faTimes,
);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .use(VueGtag, {
    config: { id: 'G-624GF25M5K' },
  })
  .mount('#app');
