export default defineNuxtConfig({
    css: ["~/assets/style/main.scss"],
    modules: ["@nuxtjs/color-mode", "@nuxtjs/tailwindcss", 'nuxt-lucide-icons'],

    runtimeConfig: {
        public: {
            API_URL: process.env.API_URL,
            POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
            POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
            STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
            PRICE_ID: process.env.PRICE_ID,
            LIVEBLOCKS_API_KEY: process.env.LIVEBLOCKS_API_KEY,
        }
    },

    routeRules: {
        '/': {
            isr: true,
            prerender: true,
            cors: true,
        }
    },

    colorMode: {
        preference: "light",
        fallback: "light",
        classSuffix: '',
        storageKey: "nuxt-starter-color-mode",
    },

    devtools: {enabled: true},
})
