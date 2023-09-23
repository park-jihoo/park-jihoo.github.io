// https://nuxt.com/docs/api/configuration/nuxt-config

import { getPageTable } from "./lib/api";

const getDynamicRoutes = async () => {
  const pageTable = await getPageTable("619787c75b60479886c147cf746bfbb8");
  const dynamicRoutes = []
  for (const page of pageTable) {
    dynamicRoutes.push(`/notes/${page.id}`)
  }
  return dynamicRoutes;
}

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
  sitemap: {
  },
  hooks: {
    async 'nitro:config'(nitroConfig){
      const dynamicRoutes = await getDynamicRoutes();
      nitroConfig.prerender.routes.push(...dynamicRoutes);
    }
  }
})