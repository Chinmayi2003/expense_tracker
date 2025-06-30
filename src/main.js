import Vue from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'
import VueMask from 'v-mask'; // Make sure this line exists and points to the correct package


import "vue-select/dist/vue-select.css"
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js';
import router from './router.js'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueMask);
Vue.use(Chartkick.use(Chart))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
