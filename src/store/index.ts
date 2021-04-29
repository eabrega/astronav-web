import Vue from "vue";
import Vuex from "vuex";
import { IDrawObjects } from "canvas-chart-ts/dist/drawObjectsFrame";
import { ISkyEvent, ISkyInfo, ISkyInfoItem } from "@/store/ISkyInfo"
import DateParser from "@/components/Common/DateParser";

Vue.use(Vuex);

export interface IState {
    date: Date;
    condition: Array<IDrawObjects>;
    events: Array<ISkyEvent>;
    info: Array<ISkyInfoItem>;
    currentFrameIndex: number,
    lon: number,
    lat: number,
}

export default new Vuex.Store({
    state: {
        date: new Date(),
        condition: Array<IDrawObjects>(),
        events: Array<ISkyEvent>(),
        info: Array<ISkyInfoItem>(),
        currentFrameIndex: 0,
        lon: 33,
        lat: 55,
    } as IState,
    mutations: {
        SET_STORE(state, val) {
            state.condition = val;
        },
        SET_INFO(state, val) {
            state.info = val;
        },
        SET_EVENTS(state, val) {
            state.events = val;
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
            const info = await LoadInfo(new DateParser(state.date).toString(), state.lat, state.lon).then();
            commit("SET_STORE", objects);
            commit("SET_INFO", info.objects);
            const id = state.condition
                .map((x) => DateToTimeString(new Date(x.time)).substring(0, 4))
                .indexOf(DateToTimeString(state.date).substring(0, 4));
            commit("SET_CURRENT_FRAME_ID", id > 0 ? id : 0);
        },
        getEvents: async ({ state, commit }) => {
            const events = await LoadEvents(new DateParser(state.date).toString(), state.lat, state.lon, state.date.getTimezoneOffset()).then();
            commit("SET_EVENTS", events);
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
            const info = await LoadInfo(new DateParser(state.date).toString(), state.lat, state.lon).then();
            commit("SET_STORE", objects);
            commit("SET_INFO", info.objects);
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
        condition: (state) => state.condition ?? null,
        events: (state): Array<ISkyEvent> => state.events,
        info: (state) => (str: string) => state.info.find(i => i.name == str),
        currentCondition: (state) => state.condition[state.currentFrameIndex]?.objects ?? null,
        lat: (state) => state.lat,
        lon: (state) => state.lon,
        displayTime: (state) => {
            const time = state.condition[state.currentFrameIndex]?.time
            return time ? DateToTimeString(new Date(time)) : "00:00";
        },
    }
});

function DateToTimeString(date: Date) {
    let hoursStr =
        date.getHours() >= 10
            ? date.getHours()
            : `0${date.getHours()}`;
    let minuteStr =
        date.getMinutes() >= 10
            ? date.getMinutes()
            : `0${+date.getMinutes()}`;

    return `${hoursStr}:${minuteStr}`;
}

async function Load(date: string, lat: number, lon: number, gmtCorrector: number) {
    const dateAsString = new DateParser(date).toApiString();
    let resp = await fetch(
        `https://api.astronav.ru/sky/condition/date/${dateAsString}/gmt/${gmtCorrector}/latitude/${lat}/longitude/${lon}`
    );
    return resp.json();
}

async function LoadInfo(date: string, lat: number, lon: number): Promise<ISkyInfo> {
    const dateAsString = new DateParser(date).toApiString();
    let resp = await fetch(
        `https://api.astronav.ru/sky/info/date/${dateAsString}/latitude/${lat}/longitude/${lon}`
    );
    return resp.json();
}

async function LoadEvents(date: string, lat: number, lon: number, gmtCorrector: number) {
    const dateAsString = new DateParser(date).toApiString();
    let resp = await fetch(
        `https://api.astronav.ru/sky/event/date/${dateAsString}/gmt/${gmtCorrector}/latitude/${lat}/longitude/${lon}`
    );
    return resp.json();
}