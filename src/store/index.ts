import DateParser from '@/components/DateParser'
import Vue from 'vue'
import Vuex from 'vuex'
import { IDrawObjects } from "canvas-chart-ts/dist/drawObjectsFrame";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        date: new Date().toString(),
        currentFrameIndex: 0,
        lon: 33,
        lat: 55,
        condition: Array<IDrawObjects>()
    },
    mutations: {
        'SET_STORE'(state, val) {
            state.condition = val
        },
        'SET_CURRENT_FRAME_ID'(state, val) {
            state.currentFrameIndex = val
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
        updateCondition: ({ state, commit }) => {
            const date = new DateParser(state.date).toApiString();
            fetch(`https://astronav.ru/condition/date/${date}/latitude/${state.lat}/longitude/${state.lat}`)
                .then(response => response.json())
                .then(data => {
                    commit('SET_STORE', data )
                });
        },
        setCurrentFrameId: ({ commit }, val) => { 
            commit('SET_CURRENT_FRAME_ID', val)
        },
        setLat: ({ commit }, val) => {
            commit('SET_LAT', val)
        },
        setLon: ({ commit }, val) => {
            commit('SET_LON', val)
        },
        setDate: ({ commit }, val) => {
            commit('SET_DATE', val)
        }
    },
    modules: {
    },
    getters: {
        date: state => state.date,
        currentFrameId: state => state.currentFrameIndex,
        condition: state => state.condition,
        lat: state => state.lat,
        lon: state => state.lon
    }
})
