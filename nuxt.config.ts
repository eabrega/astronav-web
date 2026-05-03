export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    future: {
        compatibilityVersion: 4,
    },

    ssr: false,

    modules: ['@pinia/nuxt'],

    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap-vue-next/dist/bootstrap-vue-next.css',
        'bootstrap-icons/font/bootstrap-icons.css',
        'leaflet/dist/leaflet.css',
    ],

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            meta: [
                { name: 'yandex-verification', content: 'cbc342ffbb4fd7db' },
            ],
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;600&display=swap',
                },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
    },

})
