import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueGtag from 'vue-gtag'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueGtag, {
  config: { id: 'G-624GF25M5K' }
}, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
