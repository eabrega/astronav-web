import Vue from "vue";
import Vuex from "vuex";
import { IDrawObjects } from "canvas-chart-ts/dist/drawObjectsFrame";
import { ILocalTimeZone, ISkyEvent, ISkyInfo, ISkyInfoItem } from "@/store/ISkyInfo"
import DateParser from "@/components/SideBar/DateParser";
import IUserSettings from "@/store/userSettings";
import Geo from '@/components/Common/Geolocation'
import GeolocationApiWrapper from "@/components/Common/Geolocation";

Vue.use(Vuex);

export interface IState {
    userSettings: IUserSettings;
    geolocation: GeolocationApiWrapper;
    date: Date;
    isLoading: boolean;
    condition: Array<IDrawObjects>;
    events: Array<ISkyEvent>;
    info: Array<ISkyInfoItem>;
    locationTimeZone?: ILocalTimeZone;
    currentFrameIndex: number,
    lon: number,
    lat: number,
    isShowHelpMessage: boolean
}

export default new Vuex.Store({
    state: {
        date: new Date(),
        isLoading: false,
        geolocation: new Geo(),
        condition: Array<IDrawObjects>(),
        events: Array<ISkyEvent>(),
        info: Array<ISkyInfoItem>(),
        locationTimeZone: { location: "Moscow" },
        currentFrameIndex: 0,
        lon: getLocalStoredParam()?.lon ?? 37.6,
        lat: getLocalStoredParam()?.lat ?? 55.7,
        isShowHelpMessage: getLocalStoredParam()?.isShowHelpMessage ?? true
    } as IState,
    mutations: {
        SET_CONDITIONS(state, val) {
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
        SET_LOCAL_TIME_ZONE(state, val) {
            state.locationTimeZone = <ILocalTimeZone>{
                location: val.location,
                offset: val.offset
            }
        },
        SET_DATE(state, val) {
            state.date = val;
        },
        SET_IS_LOADING(state, val) {
            state.isLoading = val;
        },
        SET_IS_SHOW_HELP(state, val) {
            state.isShowHelpMessage = val;
        }
    },
    actions: {
        getConditions: async ({ state, commit }) => {
            commit("SET_IS_LOADING", true);
            const objects = await Load(new DateParser(state.date).toString(), state.lat, state.lon, state.date.getTimezoneOffset()).then();
            const info = await LoadInfo(new DateParser(state.date).toString(), state.lat, state.lon).then();
            const timeZone = await LoadLocalTimeZone(state.lat, state.lon);
            commit("SET_LOCAL_TIME_ZONE", timeZone)
            commit("SET_CONDITIONS", objects);
            commit("SET_INFO", info.objects);
            const id = state.condition
                .map((x) => DateToTimeString(new Date(x.time)).substring(0, 4))
                .indexOf(DateToTimeString(state.date).substring(0, 4));
            commit("SET_CURRENT_FRAME_ID", id > 0 ? id : 0);
            commit("SET_IS_LOADING", false);
        },
        getEvents: async ({ state, commit }) => {
            const events = await LoadEvents(new DateParser(state.date).toString(), state.lat, state.lon, state.date.getTimezoneOffset()).then();
            commit("SET_EVENTS", events);
        },
        getLocationTimeZone: async ({ commit }, val) => {
            const timeZone = await LoadLocalTimeZone(val.lat, val.lon);
            commit("SET_LOCAL_TIME_ZONE", timeZone);
        },
        setCurrentFrameId: ({ commit }, val) => {
            commit("SET_CURRENT_FRAME_ID", val);
        },
        setLat: async ({ state, commit }, val) => {
            commit("SET_LAT", val);
            const timeZone = await LoadLocalTimeZone(state.lat, state.lon);
            commit("SET_LOCAL_TIME_ZONE", timeZone)
        },
        setLon: ({ commit }, val) => {
            commit("SET_LON", val);
        },
        // это обновление настроек а не даты!!!!!
        setDate: async ({ state, commit }, val: Date) => {
            commit("SET_IS_LOADING", true);
            commit("SET_DATE", new Date(
                val.getFullYear(),
                val.getMonth(),
                val.getDate(),
                new Date().getHours(),
                new Date().getMinutes(),
                new Date().getSeconds()));

            const objects = await Load(new DateParser(state.date).toString(), state.lat, state.lon, state.date.getTimezoneOffset()).then();
            const info = await LoadInfo(new DateParser(state.date).toString(), state.lat, state.lon).then();
            const events = await LoadEvents(new DateParser(state.date).toString(), state.lat, state.lon, state.date.getTimezoneOffset()).then();

            saveSettings(state);

            commit("SET_CONDITIONS", objects);
            commit("SET_INFO", info.objects);
            commit("SET_CURRENT_FRAME_ID", state.currentFrameIndex);
            commit("SET_EVENTS", events);
            commit("SET_IS_LOADING", false);
        },
        setIsShowHelpMessage: ({ commit, state }, val: boolean) => {
            commit("SET_IS_SHOW_HELP", val);
            saveSettings(state);
        }
    },
    modules: {},
    getters: {
        date: (state) => state.date,
        timeZone: (state) =>
            state.date.getTimezoneOffset() < 0
                ? '+' + state.date.getTimezoneOffset() / -60
                : '-' + state.date.getTimezoneOffset() / 60,
        localTimeZone: (state) => state.locationTimeZone,
        currentFrameId: (state) => state.currentFrameIndex,
        condition: (state) => state.condition ?? null,
        isLoading: (state) => state.isLoading,
        events: (state): Array<ISkyEvent> => state.events ?? null,
        info: (state) => (str: string) => state.info.find(i => i.name == str),
        currentCondition: (state) => state.condition[state.currentFrameIndex]?.objects ?? null,
        lat: (state) => state.lat,
        lon: (state) => state.lon,
        displayTime: (state) => {
            const time = state.condition[state.currentFrameIndex]?.time
            return time ? DateToTimeString(new Date(time)) : "00:00";
        },
        isShowHellpMessage: (state) => {
            state.isShowHelpMessage
        }
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

async function LoadLocalTimeZone(lat: number, lon: number): Promise<ILocalTimeZone> {
    let resp = await fetch(
        `http://192.168.1.20:5180/sky/timezone/latitude/${lat}/longitude/${lon}`
    );
    return resp.json();
}

function getLocalStoredParam(): IUserSettings | null {
    if (!(localStorage.userSettings as IUserSettings)) return null;
    return <IUserSettings>JSON.parse(localStorage.userSettings);
}

function saveSettings(state: IState) {
    localStorage.userSettings = JSON.stringify({
        lat: state.lat,
        lon: state.lon,
        isShowHelpMessage: state.isShowHelpMessage
    });
}