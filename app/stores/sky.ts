import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IDrawObjects } from '~/components/Plotter/drawObjectsFrame'
import type { ISkyEvent, ISkyInfo, ISkyInfoItem } from '~/types/ISkyInfo'
import type IUserSettings from '~/types/userSettings'
import { DateParser } from '~/utils/DateParser'

function getStored(): IUserSettings | null {
    if (typeof localStorage === 'undefined') return null
    try {
        return localStorage.userSettings
            ? (JSON.parse(localStorage.userSettings) as IUserSettings)
            : null
    } catch {
        return null
    }
}

function saveSettings(lat: number, lon: number, isShowHelpMessage: boolean) {
    localStorage.userSettings = JSON.stringify({ lat, lon, isShowHelpMessage })
}

function dateToTimeString(date: Date): string {
    const h = date.getHours()
    const m = date.getMinutes()
    return `${h >= 10 ? h : `0${h}`}:${m >= 10 ? m : `0${m}`}`
}

async function apiLoad(url: string) {
    const resp = await fetch(url)
    return resp.json()
}

async function loadConditions(dateStr: string, lat: number, lon: number, gmt: number) {
    const d = new DateParser(dateStr).toApiString()
    return apiLoad(
        `https://api.astronav.ru/sky/condition/date/${d}/gmt/${gmt}/latitude/${lat}/longitude/${lon}`
    )
}

async function loadInfo(dateStr: string, lat: number, lon: number): Promise<ISkyInfo> {
    const d = new DateParser(dateStr).toApiString()
    return apiLoad(
        `https://api.astronav.ru/sky/info/date/${d}/latitude/${lat}/longitude/${lon}`
    )
}

async function loadEvents(dateStr: string, lat: number, lon: number, gmt: number) {
    const d = new DateParser(dateStr).toApiString()
    return apiLoad(
        `https://api.astronav.ru/sky/event/date/${d}/gmt/${gmt}/latitude/${lat}/longitude/${lon}`
    )
}

export const useSkyStore = defineStore('sky', () => {
    const stored = getStored()

    const date = ref<Date>(new Date())
    const isLoading = ref(false)
    const condition = ref<IDrawObjects[]>([])
    const events = ref<ISkyEvent[]>([])
    const info = ref<ISkyInfoItem[]>([])
    const currentFrameIndex = ref(0)
    const lon = ref(stored?.lon ?? 37.6)
    const lat = ref(stored?.lat ?? 55.7)
    const isShowHelpMessage = ref(stored?.isShowHelpMessage ?? true)

    const timeZone = computed(() => {
        const offset = date.value.getTimezoneOffset()
        return offset < 0 ? `+${offset / -60}` : `-${offset / 60}`
    })

    const currentCondition = computed(
        () => condition.value[currentFrameIndex.value]?.objects ?? []
    )

    const displayTime = computed(() => {
        const time = condition.value[currentFrameIndex.value]?.time
        return time ? dateToTimeString(new Date(time)) : '00:00'
    })

    const infoByName = computed(
        () => (name: string) => info.value.find(i => i.name === name)
    )

    async function getConditions() {
        isLoading.value = true
        const dateStr = new DateParser(date.value).toString()
        const [objects, infoData] = await Promise.all([
            loadConditions(dateStr, lat.value, lon.value, date.value.getTimezoneOffset()),
            loadInfo(dateStr, lat.value, lon.value),
        ])
        condition.value = objects
        info.value = infoData.objects
        const id = condition.value
            .map((x: IDrawObjects) => dateToTimeString(new Date(x.time)).substring(0, 4))
            .indexOf(dateToTimeString(date.value).substring(0, 4))
        currentFrameIndex.value = id > 0 ? id : 0
        isLoading.value = false
    }

    async function getEvents() {
        const dateStr = new DateParser(date.value).toString()
        events.value = await loadEvents(
            dateStr,
            lat.value,
            lon.value,
            date.value.getTimezoneOffset()
        )
    }

    function setCurrentFrameId(val: number) {
        currentFrameIndex.value = val
    }

    function setLat(val: number) {
        lat.value = val
    }

    function setLon(val: number) {
        lon.value = val
    }

    // обновление настроек (дата + координаты + загрузка данных)
    async function setDate(val: Date) {
        isLoading.value = true
        date.value = new Date(
            val.getFullYear(),
            val.getMonth(),
            val.getDate(),
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
        )

        const dateStr = new DateParser(date.value).toString()
        const [objects, infoData, eventsData] = await Promise.all([
            loadConditions(dateStr, lat.value, lon.value, date.value.getTimezoneOffset()),
            loadInfo(dateStr, lat.value, lon.value),
            loadEvents(dateStr, lat.value, lon.value, date.value.getTimezoneOffset()),
        ])

        saveSettings(lat.value, lon.value, isShowHelpMessage.value)

        condition.value = objects
        info.value = infoData.objects
        events.value = eventsData
        isLoading.value = false
    }

    function setIsShowHelpMessage(val: boolean) {
        isShowHelpMessage.value = val
        saveSettings(lat.value, lon.value, isShowHelpMessage.value)
    }

    return {
        date,
        isLoading,
        condition,
        events,
        info,
        currentFrameIndex,
        lon,
        lat,
        isShowHelpMessage,
        timeZone,
        currentCondition,
        displayTime,
        infoByName,
        getConditions,
        getEvents,
        setCurrentFrameId,
        setLat,
        setLon,
        setDate,
        setIsShowHelpMessage,
    }
})
