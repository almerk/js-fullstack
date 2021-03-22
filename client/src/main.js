import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import App from './App.vue'
import routes from './routes.js'
import storeObj from './store.js'

Vue.use(Router);
Vue.use(Vuex);




const store = new Vuex.Store(storeObj);

const router = new Router({
  routes,
  mode: 'history',
});


new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
 })
