<template>
    <div id="app">
        <b-navbar toggleable="md">
            <b-navbar-brand href="#"></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse" right></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">Расписание</b-nav-item>
                    <b-nav-item to="/skymap">Карта</b-nav-item>
                    <b-nav-item to="/about">О проекте</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-b-toggle.app-settings-sidebar right>Настройки</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <div class="main">
            <AppSettingsSidebar />
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import AppSettingsSidebar from "@/components/Common/AppSettingsSidebar.vue";

export default {
    name: "App",
    metaInfo: {
        meta: [
            {
                vmid: "description",
                name: "description",
                content:
                    "Астронамический калькулятор по формулам описанным в книге Жанна Меёса." +
                    "Расчет положения шести самых ярких планет солнечной системы на любую дату и время в зависимости от координат наблюдателя." +
                    "Суточный прогноз закатов и восходов.",
            },
            {
                name: "keywords",
                vmid: "keywords",
                content:
                    "астронамический калькулятор, расчет, координаты, тректории, фаза луны, азимут, угол места, реальное время, астрономия",
            },
        ],
    },
    components: {
        AppSettingsSidebar,
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap");
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";

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
    min-width: 320px;
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

    a {
        font-weight: bold;
        font-size: 1.5em;
        color: #2c3e50;
        padding-left: 0px !important;
        &.router-link-exact-active {
            color: #42b983 !important;
        }
    }
}

.main {
    display: flex;
    margin-left: var(--main-margin);
    margin-right: var(--main-margin);
    flex-basis: 1200px;
    justify-content: center;
}
</style>
