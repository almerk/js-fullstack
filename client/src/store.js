import endpoints from './api/endpoints.js'
import axios from 'axios'
import Vuex from 'vuex'

export default {
  state: {
    endpoints,
    objects: null,
    subjects: null,
    relations: null,
    dates: null
  },
  getters: {
    users: state => (state.subjects || []).filter(x => x.$type == "user"),
    groups: state => (state.subjects || []).filter(x => x.$type == "group"),
    types: state => (state.objects || []).filter(x => x.$type == "calendarType"),
    calendars: state => (state.objects || []).filter(x => x.$type == "calendar"),
    events: state => (state.objects || []).filter(x => x.$type.match(/\w*Event/)),
    relations: state => (state.relations || []),
    dates: state => (state.dates || []),
  },
  mutations: {
    initialize(state) {
      Object.keys(state.endpoints.common).forEach(key => {
        console.log(`retrieving data from ${key}:${state.endpoints.common[key]}`);
        axios.get(state.endpoints.common[key])
          .then(response => {
            state[key] = response.data
          })
          .catch(err => console.error(`Retrieving ${key} error:`, err));
      });
    }
  }
}