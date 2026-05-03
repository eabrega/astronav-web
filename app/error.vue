<template>
    <div class="page-not-found">
        <h1>{{ error?.statusCode === 404 ? '404' : 'Ошибка' }}</h1>
        <p>{{ error?.statusCode === 404 ? 'Такой страницы не существует' : error?.message }}</p>
        <BButton variant="primary" @click="handleError">На главную</BButton>
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useHead({ title: props.error?.statusCode === 404 ? '404 NotFound' : 'Ошибка' })

function handleError() {
    clearError({ redirect: '/' })
}
</script>

<style lang="scss">
.page-not-found {
    text-align: center;
    padding-top: 60px;

    h1 {
        font-size: 8em !important;
    }

    p {
        font-size: 1.2em !important;
    }
}
</style>
