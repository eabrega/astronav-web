import DateParser from "@/components/DateParser";
import Vue from "vue";
import Vuex from "vuex";
import { IDrawObjects } from "canvas-chart-ts/dist/drawObjectsFrame";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        date: new Date(),
        currentFrameIndex: 0,
        lon: 33,
        lat: 55,
        condition: Array<IDrawObjects>(),
    },
    mutations: {
        SET_STORE(state, val) {
            state.condition = val;
        },
        SET_CURRENT_FRAME_ID(state, val) {
            state.currentFrameIndex = val;
        },
        SET_LAT(state, val) {
            state.lat = val;
        },
        SET_LON(state, val) {
            state.lon = val;
        },
        SET_DATE(state, val) {
            state.date = val;
        },
    },
    actions: {
        updateCondition: async ({ state, commit }) => {
            const objects = await Load(new DateParser(state.date).toString(), state.lat, state.lon, state.date.getTimezoneOffset()).then();
            commit("SET_STORE", objects);
            const id = state.condition
                .map((x) => timeToString(new Date(x.time)).substring(0, 4))
                .indexOf(timeToString(new Date()).substring(0, 4));
            commit("SET_CURRENT_FRAME_ID", id);
        },
        setCurrentFrameId: ({ state, commit }, val) => {
            commit("SET_CURRENT_FRAME_ID", val);
        },
        setLat: ({ commit }, val) => {
            commit("SET_LAT", val);
        },
        setLon: ({ commit }, val) => {
            commit("SET_LON", val);
        },
        setDate: async ({ state, commit }, val) => {
            const objects = await Load(new DateParser(state.date).toString(), state.lat, state.lon, state.date.getTimezoneOffset()).then();
            commit("SET_STORE", objects);
            commit("SET_CURRENT_FRAME_ID", state.currentFrameIndex);
            commit("SET_DATE", val);
        },
    },
    modules: {},
    getters: {
        date: (state) => state.date,
        timeZone: (state) =>
            state.date.getTimezoneOffset() < 0
                ? '+' + state.date.getTimezoneOffset() / -60
                : '-' + state.date.getTimezoneOffset() / 60,
        currentFrameId: (state) => state.currentFrameIndex,
        condition: (state) => state.condition,
        currentCondition: (state) => state.condition[state.currentFrameIndex]?.skyObject ?? null,
        lat: (state) => state.lat,
        lon: (state) => state.lon,
        displayTime: (state) => {
            let time = new Date(state.condition[state.currentFrameIndex].time);
            return timeToString(time);
        },
    }
});

function timeToString(date: Date) {
    let hoursStr =
        date.getHours() >= 10
            ? date.getHours() 
            : `0${date.getHours() }`;
    let minuteStr =
        date.getMinutes() >= 10
            ? date.getMinutes()
            : `0${+date.getMinutes()}`;

    return `${hoursStr}:${minuteStr}`;
}

async function Load(date: string, lat: number, lon: number, gmtCorrector: number) {
    const dateAsString = new DateParser(date).toApiString();
    let resp = await fetch(
        `https://api.astronav.ru/condition/date/${dateAsString}/gmt/${gmtCorrector}/latitude/${lat}/longitude/${lon}`
    );
    return resp.json();
}
