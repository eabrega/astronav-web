<template>
    <div class="app-settings-sidebar">
        <BOffcanvas
            v-model="visible"
            placement="end"
            title="Настройки"
            lazy
            @shown="onShown"
        >
            <div class="px-3 py-2">
                <BInputGroup prepend="Широта" class="mt-3">
                    <BFormInput
                        class="input-latlon"
                        name="lat"
                        v-model.number="lat"
                        :state="isLatValid"
                        type="number"
                        step="0.001"
                    />
                </BInputGroup>
                <BInputGroup prepend="Долгота" class="mt-3">
                    <BFormInput
                        class="input-latlon"
                        name="lon"
                        v-model.number="lon"
                        :state="isLonValid"
                        type="number"
                        step="0.001"
                    />
                </BInputGroup>

                <BButton
                    class="mt-4"
                    v-if="geo.IsAvailable"
                    @click="detectLocation"
                    variant="primary"
                    block
                >
                    Определить местоположение
                </BButton>

                <OpenStreetMapWrapper
                    ref="mapWrapper"
                    :coordinates="{ lat, lon }"
                    @map-click="onMapClick"
                />

                <BInputGroup prepend="Дата" class="mt-3">
                    <BFormInput
                        v-model="currentDate"
                        type="date"
                        class="input-date"
                    />
                </BInputGroup>

                <BButton
                    class="mt-4"
                    @click="save"
                    variant="success"
                >
                    Сохранить
                </BButton>

                <BFormCheckbox
                    v-model="hideHints"
                    class="mt-4 input-latlon"
                    size="lg"
                    name="check-button"
                    switch
                >
                    <span>Скрывать подсказки</span>
                </BFormCheckbox>
            </div>
        </BOffcanvas>

        <BModal
            v-model="showGeoErrorModal"
            title="Ошибка!"
            ok-only
            header-bg-variant="warning"
        >
            <p class="my-2">
                Определение геопозиции запрещено настройками безопасности вашего браузера.
                Для изменения настроек воспользуйтесь
                <a
                    href="https://yandex.ru/yandsearch?text=%D0%BA%D0%B0%D0%BA+%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C+%D0%B3%D0%B5%D0%BE%D0%BF%D0%BE%D0%B7%D0%B8%D1%86%D0%B8%D1%8E+%D0%B2+%D0%B1%D1%80%D0%B0%D1%83%D0%B7%D0%B5%D1%80%D0%B5&from=os&lr=20728"
                    >инструкцией</a
                >.
            </p>
        </BModal>
    </div>
</template>

<script setup lang="ts">
import { GeolocationApiWrapper } from '~/utils/Geolocation'
import { DateParser } from '~/utils/DateParser'
import type { ICoords } from '~/types/ICoords'

const store = useSkyStore()
const { visible } = useSidebarVisible()

const lat = ref(store.lat)
const lon = ref(store.lon)
const currentDate = ref(new DateParser(store.date).toString())
const showGeoErrorModal = ref(false)

const geo = new GeolocationApiWrapper()
const mapWrapper = ref<{ mapReRender: () => void } | null>(null)

const isLatValid = computed(() => Math.abs(lat.value) <= 90)
const isLonValid = computed(() => Math.abs(lon.value) <= 180)

const hideHints = computed({
    get() {
        return !store.isShowHelpMessage
    },
    set(val: boolean) {
        store.setIsShowHelpMessage(!val)
    },
})

function onMapClick(coords: ICoords) {
    lat.value = coords.lat
    lon.value = coords.lon
}

function save() {
    if (isLatValid.value && isLonValid.value) {
        store.setLon(lon.value)
        store.setLat(lat.value)
        store.setDate(new DateParser(currentDate.value).Date)
        visible.value = false
    }
}

async function detectLocation() {
    try {
        const coords = await geo.UpdateCoords()
        lat.value = parseFloat(coords.latitude.toFixed(3))
        lon.value = parseFloat(coords.longitude.toFixed(3))
    } catch (e: any) {
        showGeoErrorModal.value = true
    }
}

function onShown() {
    mapWrapper.value?.mapReRender()
}
</script>

<style lang="scss">
.app-settings-sidebar {
    .input-group-text {
        width: 90px;
        font-weight: 550;
    }
}
</style>
