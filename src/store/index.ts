import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        condition: {}
    },
    mutations: {
        'SET_STORE'(state, data) {
            state.condition = data
        }
    },
    actions: {
        initStore: ({ commit }) => {
            fetch(`https://astronav.ru/condition/date/22-06-1985/latitude/55/longitude/33`)
            .then(response => response.json())
            .then(data => commit('SET_STORE', data));
        }
    },
    modules: {
    },
    getters: {
        data: state => state.condition
    }
})
