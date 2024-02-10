export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'ru',
            },
        },
    },
    css: ['~/assets/scss/style.scss'],
    runtimeConfig: {
        public: {
            apiBase: '/api',
        },
    },
    devtools: { enabled: false },
})
