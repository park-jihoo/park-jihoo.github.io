// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  css:['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build:{
    transpile: ['vuetify']
  },
  modules: [
    'nuxt-gtag',
    'nuxt-og-image',
    'nuxt-simple-robots',
    'nuxt-simple-sitemap',
  ],
  gtag: {
    id: 'G-5H39DYHZK8'
  },
  site: {
    url: 'https://park-jihoo.github.io',
  },
  ssr: true,
  nitro:{
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/sitemap.xml',
        '/algorithm',
      ]
    }
  }
})