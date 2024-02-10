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
            API: process.env.API,
        },
    },
    modules: ['@pinia/nuxt', 'nuxt-swiper'],
    pinia: {
        storesDirs: ['./store/**'],
    },
    devtools: { enabled: false },
})
