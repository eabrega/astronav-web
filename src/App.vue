<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Карта</router-link>
            <router-link to="/about">О проекте</router-link>
        </div>
        <hr>
        <router-view />
    </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap");
#app {
    font-family: "Ubuntu", sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
    padding-top: 20px;
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
