<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Расписание</router-link>
            <router-link to="/skymap">Карта</router-link>
            <router-link to="/about">О проекте</router-link>
        </div>
        <hr />
        <router-view />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default {
    name: "App",
    metaInfo: {
        meta: [
            {
                vmid: "description",
                name: "description",
                content: "content",
            }
        ]
    }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap");
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "node_modules/bootstrap-vue/src/index.scss";
#app {
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
        width: 900px;
    }
}

#nav {
    padding-top: 15px;
    padding-left: 50px;
    a {
        font-weight: bold;
        font-size: 1.5em;
        color: #2c3e50;
        padding-right: 40px;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
