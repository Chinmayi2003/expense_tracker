import Vue from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'

import "vue-select/dist/vue-select.css"
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js';
Vue.config.productionTip = false

Vue.use(Chartkick.use(Chart))




new Vue({
  render: h => h(App),
}).$mount('#app')
