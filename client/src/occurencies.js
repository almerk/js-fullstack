import endpoints from './api/endpoints.js'
import axios from 'axios'
import dateAndTime from 'date-and-time'

const DEFAULT_DAYS_INTERVAL = 45;
const START_DATE = dateAndTime.addDays(new Date(), - DEFAULT_DAYS_INTERVAL)
const FINISH_DATE = dateAndTime.addDays(new Date(), DEFAULT_DAYS_INTERVAL)
const format = (date) => dateAndTime.format(date, 'YYYY-MM-DD');


export default {
    namespaced: true,
    state: {
        loading: true,
        computed: null,
        start: START_DATE,
        end: FINISH_DATE
    },
    getters: {
        values: (state) => state.computed || [],
    },
    mutations: {
        retrieve: (state, start, end) => {
            const req = endpoints.occurencies(format(state.start), format(state.end))
            state.loading = true;
            axios.get(req)
                .then(response => {
                    state.computed = response.data
                    console.log(state.computed)
                })
                .catch(err => console.error(`Retrieving occurencies error:`, err));
        },
        clear: (state) => state.computed = null
    }
}