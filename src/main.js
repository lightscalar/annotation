import('../node_modules/vuetify/dist/vuetify.min.css')
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import moment from 'moment'
window.moment = moment

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use

var app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

window.router = app.$router
