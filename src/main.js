// // main.js
// import Vue from 'vue'
// import App from './App.vue'
// import store from './store'
// import router from './router'
// import { auth } from "./firebase";

// Vue.config.productionTip = false
// Vue.prototype.$auth = auth;
// new Vue({
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

Vue.config.productionTip = false
Vue.prototype.$auth = auth

let app = null

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch('setUser', user.uid)
    store.dispatch('fetchTransactions')  
  } else {
    store.commit('RESET_STATE')  
  }
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
