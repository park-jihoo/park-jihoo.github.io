// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css:['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build:{
    transpile: ['vuetify']
  },
  modules: [
    ["vue3-notion/nuxt", {css: true}],
    'nuxt-gtag',
    'nuxt-simple-sitemap',
    'nuxt-og-image'
  ],
  gtag: {
    id: 'G-5H39DYHZK8'
  }
})