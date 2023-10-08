// https://nuxt.com/docs/api/configuration/nuxt-config

import { getPageTable } from "./lib/api";

const fetchGithubFiles = async () => {
  try {
    const owner = "park-jihoo";
    const repo = "Algorithm";
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
    const response = await fetch(apiUrl);
    let data = await response.json();
    if(data.tree){
      data = data.tree.filter((item) => item.type === "tree");
      if(data){
        data = data.filter(
          (item) =>
            (item.path.includes("leetcode")
              || item.path.includes("백준")
              || item.path.includes("프로그래머스"))
        ).map((item) => '/algorithm/'+item.path);
        return data;
      }else{
        return [];
      }
    }else{
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

async function getDynamicRoutes(){
  const [
    notes,
    algorithm,
  ] = await Promise.all([
    await getPageTable("619787c75b60479886c147cf746bfbb8"),
    await fetchGithubFiles()
  ])

  let urls = []
  if (notes){
    for (const note of notes) {
      urls.push({
        loc: `/notes/${note.id}`,
      })
    }

  }

  if(algorithm){
    for (const a of algorithm) {
      if(a.split('/').length === 5){
        urls.push({
          loc : a,
        })
      }
    }
  }

  urls.push('/algorithm');

  return urls;
}

export default defineNuxtConfig({
  devtools: { enabled: true },
  css:[
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    'katex/dist/katex.min.css',
    'prismjs/themes/prism.css',
  ],
  build:{
    transpile: ['vuetify']
  },
  modules: [
    'nuxt-gtag',
    'nuxt-og-image',
    'nuxt-simple-robots',
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    '@nuxt/content',
  ],
  gtag: {
    id: 'G-5H39DYHZK8'
  },
  site: {
    url: 'https://park-jihoo.github.io',
  },
  ssr: true,
  app:{
    head:{
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  nitro: {
    prerender: {
      routes: [
        '/sitemap.xml',
        '/algorithm',
        '/notes'
        ],
      crawlLinks: true,
    }
  },
  imports: {
    dirs: ['./stores']
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  hooks: {
    async 'nitro:config' (nitroConfig) {
      // if(nitroConfig.prerender.routes.length === 0) return;
      // const routes = await getDynamicRoutes();
      // const staticEndpoints = routes.map((route) => route.loc);
      // nitroConfig.prerender.routes.push(...staticEndpoints);
    }
  }
})