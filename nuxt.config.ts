// https://nuxt.com/docs/api/configuration/nuxt-config

import { getPageTable } from "vue3-notion";
import { Octokit } from "@octokit/core";

const fetchGithubFiles = async () => {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const tree = await octokit.request(
      "GET /repos/park-jihoo/Algorithm/git/trees/main?recursive=1",
    );
    let data = tree.data;
    if (data.tree) {
      data = data.tree.filter((item: { type: string }) => item.type === "tree");
      if (data) {
        data = data
          .filter(
            (item: { path: string | string[] }) =>
              item.path.includes("leetcode") ||
              item.path.includes("백준") ||
              item.path.includes("프로그래머스"),
          )
          .map((item: { path: string }) => "/algorithm/" + item.path);
        return data;
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

async function getDynamicRoutes() {
  const [notes, algorithm] = await Promise.all([
    await getPageTable("619787c75b60479886c147cf746bfbb8"),
    await fetchGithubFiles(),
  ]);

  let urls = [];
  if (notes) {
    for (const note of notes) {
      urls.push({
        loc: `/notes/${note.id}`,
      });
    }
  }

  if (algorithm) {
    for (const a of algorithm) {
      if (a.split("/").length === 5) {
        urls.push({
          loc: a,
        });
      }
    }
  }

  urls.push("/algorithm");

  return urls;
}

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "katex/dist/katex.min.css",
    "prismjs/themes/prism.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "nuxt-gtag",
    "nuxt-og-image",
    "nuxt-simple-robots",
    "@pinia/nuxt",
    "nuxt-simple-sitemap",
    "@nuxt/image",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    ["vue3-notion/nuxt", { css: true }],
  ],
  gtag: {
    id: "G-5H39DYHZK8",
  },
  site: {
    url: "https://park-jihoo.github.io",
  },
  sitemap: {
    xsl: false,
  },
  ssr: true,
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  nitro: {
    prerender: {
      routes: ["/algorithm", "/notes", "/200.html", "/sitemap.xml", "/"],
      crawlLinks: true,
    },
  },
  imports: {
    dirs: ["./stores"],
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  hooks: {
    async "nitro:config"(nitroConfig) {
      const routes = await getDynamicRoutes();
      const staticEndpoints = routes.map((route) => route.loc);
      // @ts-ignore
      nitroConfig.prerender.routes.push(...staticEndpoints);
    },
  },
});
