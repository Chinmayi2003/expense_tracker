import Vue from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "vue-select/dist/vue-select.css"
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import router from './router.js' 


import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDC24MyrH1SEEs8dCDbGkhFixiVQsKJQXY",
  authDomain: "expense-tracker-634e8.firebaseapp.com",
  projectId: "expense-tracker-634e8",
  storageBucket: "expense-tracker-634e8.appspot.com",
  messagingSenderId: "3963095897",
  appId: "1:3963095897:web:6ea813db9909154bef9a48",
  measurementId: "G-HZ3N046V1Y"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

Vue.prototype.$auth = auth;

Vue.config.productionTip = false
Vue.use(Chartkick.use(Chart))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
