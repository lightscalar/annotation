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

// Modify local storage!
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

// Set up local active session storage.
if (!localStorage.getObj('activeSessions')) {
  localStorage.setObj('activeSessions', {})
}


// Implement an SPRINTF filter! So nice to have.
Vue.filter('fieldTitle', function(value) {
  if (value.units != '') {
    return value.name + ' (' + value.units + ')'
  } else {
    return value.name
  }
})

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

window.guid = function () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

