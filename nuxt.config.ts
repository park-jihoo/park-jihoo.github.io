// https://nuxt.com/docs/api/configuration/nuxt-config

import { getPageTable } from "./lib/api";

const fetchGithubFiles = async () => {
  try {
    const owner = "park-jihoo";
    const repo = "Algorithm";
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
    const response = await fetch(apiUrl);
    let data = await response.json();
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
  } catch (error) {
    console.error(error);
  }
};

const filterAndFormatPosts = async (data) => {
  let questions = [];
  for (const item of data) {
    const path = item.path.split("/");
    if (questions.map((item) => item.url).includes(path[2])) {
      const index = questions.findIndex((question) => question.url === path[2]);
      questions[index].languages.push(path[3].split(".").pop());
    } else {
      if (path[0] === "leetcode") {
        questions.push({
          id: path[2].split("-")[0],
          url: path[2],
          name: path[2]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0]
        });
      } else if (path[0] === "백준") {
        questions.push({
          id: path[2].split(".")[0],
          url: path[2],
          name: path[2].split(".")[1]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0]
        });
      } else {
        questions.push({
          id: path[2].split(".")[0],
          url: path[2],
          name: path[2].split(".")[1]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0]
        });
      }
    }
  }
  return questions.sort((a, b) => a.id - b.id);
};

const getDynamicRoutes = async () => {
  const githubFiles = await fetchGithubFiles();
  const formattedPosts = await filterAndFormatPosts(githubFiles);
  const pageTable = await getPageTable("619787c75b60479886c147cf746bfbb8");
  const dynamicRoutes = []
  for (const post of formattedPosts) {
    dynamicRoutes.push(`/algorithm/${post.platform}/${post.difficulty}/${post.url}`)
  }
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
    urls: async () => {
      const dynamicRoutes = await getDynamicRoutes()
      return dynamicRoutes
    },
  },
  nitro:{
    prerender:{
      crawlLinks: true,
    }
  }
})