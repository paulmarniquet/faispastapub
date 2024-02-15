export default defineNuxtConfig({
    css: ["~/assets/style/main.scss"],
    modules: ["@nuxtjs/color-mode", "@nuxtjs/tailwindcss"],

    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL || "http://localhost:3000",
            POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
            POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
        }
    },

    colorMode: {
        preference: "system",
        fallback: "dark",
        classSuffix: '',
        storageKey: "nuxt-starter-color-mode",
    },


    devtools: {enabled: true},
})
