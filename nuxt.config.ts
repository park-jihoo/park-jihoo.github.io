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
      data = data.tree
        .filter((item) => item.type === "blob")
        .filter(
          (item) =>
            item.path.includes("leetcode")
            || item.path.includes("백준")
            || item.path.includes("프로그래머스")
        )
        .filter((item) => !item.path.includes(".md"));
      return data;
    }else{
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

const filterAndFormatPosts = async (data) => {
  let questions = [];
  for (const item of data) {
    const path = item.path.split("/");
    if (questions.map((item) => item.slug).includes(path[2])) {
      const index = questions.findIndex((question) => question.slug === path[2]);
      questions[index].languages.push(path[3].split(".").pop());
    } else {
      if (path[0] === "leetcode") {
        questions.push({
          id: path[2].split("-")[0],
          slug: path[2],
          name: path[2]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0],
          url: '/algorithm/'+path[0]+'/' + path[1]+'/' + path[2]
        });
      } else if (path[0] === "백준") {
        questions.push({
          id: path[2].split(".")[0],
          slug: path[2],
          name: path[2].split(".")[1]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0],
          url: '/algorithm/'+path[0]+'/' + path[1]+'/' + path[2]
        });
      } else {
        questions.push({
          id: path[2].split(".")[0],
          slug: path[2],
          name: path[2].split(".")[1]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0],
          url: '/algorithm/'+path[0]+'/' + path[1]+'/' + path[2]
        });
      }
    }
  }
  return questions.sort((a, b) => a.id - b.id);
};

async function getDynamicRoutes(){
  const [
    notes,
    algorithm,
  ] = await Promise.all([
    getPageTable("619787c75b60479886c147cf746bfbb8"),
    filterAndFormatPosts(await fetchGithubFiles())
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
      urls.push({
        loc : `${a.url}`,
      })
    }
  }

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
  routeRules: {
    '/algorithm/**':{prerender: true},
    '/notes/**':{prerender: true},
  },
  hooks: {
    async 'nitro:config' (nitroConfig) {
      const routes = await getDynamicRoutes();
      const staticEndpoints = routes.map((route) => route.loc);
      nitroConfig.prerender.routes.push(...staticEndpoints);
    }
  }
})