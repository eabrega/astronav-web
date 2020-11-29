// import { LayoutPlugin } from 'bootstrap-vue';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        date: Date.now(),
        lon: 33,
        lat: 55,
        condition: {}
    },
    mutations: {
        'SET_STORE'(state, val) {
            state.condition = val
        },
        'SET_LAT'(state, val) {
            state.lat = val
        },
        'SET_LON'(state, val) {
            state.lon = val
        },
        'SET_DATE'(state, val) {
            state.date = val
        }
    },
    actions: {
        initStore: ({state, commit }) => {
            fetch(`https://astronav.ru/condition/date/22-06-1985/latitude/${state.lat}/longitude/${state.lat}`)
                .then(response => response.json())
                .then(data => {
                    commit('SET_STORE', data)
                });
        },
        setLat: ({commit}, val) =>{
            commit('SET_LAT', val)
        },
        setLon: ({commit}, val) =>{
            commit('SET_LON', val)
        },
        setDate: ({commit}, val) =>{
            commit('SET_DATE', val)
        }
    },
    modules: {
    },
    getters: {
        date: state => state.date,
        condition: state => state.condition,
        lat: state => state.lat,
        lon: state => state.lon
    }
})
