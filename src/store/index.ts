import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        lon: 33,
        lat: 55,
        condition: {}
    },
    mutations: {
        'SET_STORE'(state, data) {
            state.condition = data
        },
        'SET_LAT'(state, val) {
            state.lat = val
        }
    },
    actions: {
        initStore: ({ commit }) => {
            fetch(`https://astronav.ru/condition/date/22-06-1985/latitude/55/longitude/33`)
                .then(response => response.json())
                .then(data => commit('SET_STORE', data));
        },
        setLat: ({commit}, val) =>{
            commit('SET_LAT', val)
        }
    },
    modules: {
    },
    getters: {
        data: state => state.condition,
        lat: state => state.lat
    }
})
