import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import api from './api/api.js'
import axios from 'axios'
Vue.use(Router);
Vue.use(Vuex);

const router = new Router({
  routes,
  mode: 'history',
});

const store = new Vuex.Store({
  state: { ... Object.fromEntries(Object.entries(api.endpoints).map(entry => { entry[1] = null; return entry } ))}, //Initializing state with null model sets
  mutations: {
    populate (state) {
        Object.keys(api.endpoints).forEach(key => {
          axios.get(api.endpoints[key])
          .then(response => {
              state[key] = response.data
          })
          .catch(err => console.error(`Retrieving ${key} error:`, err));
        });
    }
  }
})


new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
 })
