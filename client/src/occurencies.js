import endpoints from './api/endpoints.js'
import axios from 'axios'
import dateAndTime from 'date-and-time'

const DEFAULT_DAYS_INTERVAL = 45;
const today = new Date(); today.setHours(0); today.setMinutes(0); today.setSeconds(0)
const START_DATE = dateAndTime.addDays(today, - DEFAULT_DAYS_INTERVAL)
const FINISH_DATE = dateAndTime.addDays(today, DEFAULT_DAYS_INTERVAL)
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
        dates: (state) => [...Array(dateAndTime.subtract(state.end, state.start).toDays() + 1).keys()]
            .map(x => dateAndTime.addDays(state.start, x)),
        byDates: (state, getters) => state.computed ? getters.dates.reduce((current, val) => {
            const key = format(val);
            current[key] = state.computed.filter(x => dateAndTime.isSameDay(val, new Date(x.dateTime.value)));
            return current;
        }, {}) : {}
    },
    mutations: {
        retrieve: (state, start, end) => {
            state.start = start || state.start;
            state.end = end || state.end;
            const req = endpoints.occurencies(format(state.start), format(state.end))
            getOccurencies(state, req);
        },
        retrievePrevious: (state, start) => {
            const reqRight = dateAndTime.addDays(state.start, -1);
            state.start = start || dateAndTime.addDays(state.start, -DEFAULT_DAYS_INTERVAL);
            const req = endpoints.occurencies(format(state.start), format(reqRight));
            getOccurencies(state, req, (state, data) => {
                state.unshift(...data);
            });
        },
        retrieveNext: (state, end) => {
            const reqLeft = dateAndTime.addDays(state.end, 1);
            state.end = end || dateAndTime.addDays(state.end, DEFAULT_DAYS_INTERVAL);
            const req = endpoints.occurencies(format(reqLeft), format(state.end));
            getOccurencies(state, req, (state, data) => {
                state.push(...data);
            });
        },
        clear: (state) => state.computed = null
    }
}

function getOccurencies(state, req, transformState = (state, data) => { state.computed = data }) {
    state.loading = true;
    axios.get(req)
        .then(response => {
            transformState(state, response.data);
            state.loading = false;
        })
        .catch(err => console.error(`Retrieving occurencies error:`, err));
}