<template>
    <div id="app">
        <BNavbar toggleable="md">
            <BNavbarBrand href="#" />
            <BNavbarToggle target="nav-collapse" />
            <BCollapse id="nav-collapse" is-nav>
                <BNavbarNav>
                    <BNavItem to="/">Расписание</BNavItem>
                    <BNavItem to="/skymap">Карта</BNavItem>
                    <BNavItem to="/about">О проекте</BNavItem>
                </BNavbarNav>
                <BNavbarNav class="ms-auto">
                    <BNavItem @click="toggle">Настройки</BNavItem>
                </BNavbarNav>
            </BCollapse>
        </BNavbar>

        <div class="main">
            <div class="wrap">
                <AppSettingsSidebar />

                <BAlert variant="success" v-model="isShowMessageBox" dismissible>
                    На странице представленна информация об астрономических объектах видимых с
                    учетом вашего
                    <span class="sidebar-link" @click="toggle">местоположения</span>.
                    <br />
                    Выбранное местоположение сохранится в настройках браузера.
                    <br />
                    Вы всегда можете изменить отображение подсказок в
                    <span class="sidebar-link" @click="toggle">настройках</span>.
                </BAlert>

                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const store = useSkyStore()
const { toggle } = useSidebarVisible()

const isShowMessageBox = computed({
    get() {
        if (import.meta.server) return false
        if ((window as any)?.prerenderInjected === 'false') return false
        return store.isShowHelpMessage
    },
    set(_val: boolean) {
        store.setIsShowHelpMessage(false)
    },
})
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;600&display=swap");

:root {
    --main-margin: 20px;
    --min-size: calc(320px - var(--main-margin) * 2);
    --max-size: 1200px;
}

@media (max-width: 440px) {
    :root {
        --main-margin: 10px;
    }
}

#app {
    min-width: var(--min-size);
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    h1 {
        font-size: 1.7em;
        padding-top: 20px;
        padding-bottom: 10px;
    }

    h2 {
        font-size: 1.6em;
        padding-top: 20px;
        padding-bottom: 15px;
    }

    p {
        font-size: 1.1em;
        padding-top: 5px;
    }

    .main {
        display: flex;
        justify-content: center;

        .wrap {
            max-width: calc(var(--max-size));
            min-width: calc(var(--min-size) - var(--main-margin));
            margin-left: var(--main-margin);
            margin-right: var(--main-margin);
        }
    }

    ::-webkit-scrollbar-track {
        background-color: rgba(0, 140, 255, 0.158);
        box-shadow: 0px 0px 3px rgb(190, 190, 190) inset;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background-color: #42b983;
        box-shadow: 0px 1px 1px rgb(190, 190, 190) inset;
        background-position: center;
        background-repeat: no-repeat;
    }

    ::-webkit-scrollbar {
        height: 15px;
    }
}

.navbar {
    background-color: rgba(0, 140, 255, 0.158);
    margin-bottom: var(--main-margin);

    .nav-item {
        padding-right: var(--main-margin);
    }

    a,
    .nav-link {
        font-weight: bold;
        font-size: 1.5em;
        color: #2c3e50;
        padding-left: 0px !important;
        cursor: pointer;

        &.router-link-exact-active {
            color: #42b983 !important;
        }
    }
}

.sidebar-link {
    cursor: pointer;
    text-decoration: underline;
    font-weight: bold;
}
</style>
