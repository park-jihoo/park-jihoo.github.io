<script setup>
import Prism from "prismjs";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-cpp.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-sql.js";
import { CodeBlock } from "vue3-code-block";
import { Octokit } from "@octokit/rest";
import { VSkeletonLoader } from "vuetify/lib/labs/components";
import { useTheme } from "vuetify";
import { useAlgorithmStore } from "~/stores/algorithm";
import Giscus from "@giscus/vue";

const difficulty = ref("");
const route = useRoute();
const theme = useTheme();
const cookie = useCookie("algorithm");

const slug = route.params.slug;
const platform = route.params.platform;
difficulty.value = route.params.difficulty;

const algorithmStore = useAlgorithmStore();

// get cookie or fetch
const fetchGithubFiles = async () => {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const tree = await octokit.request(
      "GET /repos/park-jihoo/Algorithm/git/trees/main?recursive=1",
    );
    let data = tree.data;
    data = data.tree
      .filter((item) => item.type === "blob")
      .filter(
        (item) =>
          item.path.includes("leetcode") ||
          item.path.includes("백준") ||
          item.path.includes("프로그래머스"),
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
    if (questions.map((item) => item.slug).includes(path[2])) {
      const index = questions.findIndex(
        (question) => question.slug === path[2],
      );
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
          url: "/algorithm/" + path[0] + "/" + path[1] + "/" + path[2],
        });
      } else if (path[0] === "백준") {
        questions.push({
          id: path[2].split(".")[0],
          slug: path[2],
          name: path[2]
            .split(".")[1]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0],
          url: "/algorithm/" + path[0] + "/" + path[1] + "/" + path[2],
        });
      } else {
        questions.push({
          id: path[2].split(".")[0],
          slug: path[2],
          name: path[2]
            .split(".")[1]
            .replace(/-/g, " ")
            .replace(/\d\d\d\d/g, "")
            .trim(),
          languages: [path[3].split(".").pop()],
          difficulty: path[1],
          platform: path[0],
          url: "/algorithm/" + path[0] + "/" + path[1] + "/" + path[2],
        });
      }
    }
  }
  return questions.sort((a, b) => a.id - b.id);
};

const { data: posts } = await useLazyAsyncData(
  "posts",
  () => {
    return fetchGithubFiles().then((data) => {
      return filterAndFormatPosts(data);
    });
  },
  { watch: [route] },
);

const { data: langs } = await useLazyAsyncData(
  "langs",
  () => {
    return posts.value.filter((post) => post.slug === slug)[0].languages;
  },
  { watch: [posts] },
);

const { data: lang } = await useLazyAsyncData(
  "lang",
  () => {
    return langs.value[0];
  },
  { watch: [langs] },
);

const { data: code, pending: pending } = await useLazyAsyncData(
  "code",
  () => {
    const file =
      platform !== "leetcode"
        ? `${slug.split(".")[1].trim()}.${lang.value}`
        : `${slug}.${lang.value}`;
    const githubUrl = `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty.value}/${slug}/${file}`;
    return $fetch(githubUrl).then((res) => {
      return res;
    });
  },
  { watch: [lang] },
);

const getColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "green";
    case "Medium":
      return "orange";
    case "Hard":
      return "red";
    case "Bronze":
      return "brown";
    case "Silver":
      return "grey";
    case "Gold":
      return "yellow darken-2";
    case "Platinum":
      return "blue darken-2";
    case "lv1":
      return "green";
    case "lv2":
      return "orange";
    case "lv3":
      return "yellow";
    case "lv4":
      return "red";
  }
};

const getLink = (platform, slug) => {
  switch (platform) {
    case "leetcode":
      return `https://leetcode.com/problems/${slug
        .replace(/\d\d\d\d-/g, "")
        .replace(/ /g, "-")}`;
    case "프로그래머스":
      return `https://programmers.co.kr/learn/courses/30/lessons/${slug}`;
    case "백준":
      return `https://www.acmicpc.net/problem/${slug.split(".")[0]}`;
  }
};

useServerSeoMeta({
  ogTitle: () =>
    `${slug.replace(/\d\d\d\d-/g, "").replace(/-/g, " ")} | Algorithm`,
  ogDescription: () =>
    `${platform} - ${difficulty.value} | ${slug
      .replace(/\d\d\d\d-/g, "")
      .replace(/-/g, " ")}`,
  twitterTitle: () =>
    `${slug.replace(/\d\d\d\d-/g, "").replace(/-/g, " ")} | Algorithm`,
});
</script>

<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col align-self="auto">
          <v-card outlined class="pa-4 elevation-3">
            <v-card-title class="headline">
              <v-chip class="ml-2" :color="getColor(difficulty)">
                {{ difficulty }}
              </v-chip>
              {{
                route.params.slug.replace(/\d\d\d\d-/g, "").replace(/-/g, " ")
              }}
              <v-btn
                icon
                class="elevation-0"
                rounded="0"
                variant="text"
                :ripple="false"
                :href="getLink(route.params.platform, route.params.slug)"
                target="_blank"
              >
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-select
                v-if="langs"
                v-model="lang"
                :items="langs"
                label="Select Language"
                outlined
                dense
                color="primary"
                :disabled="langs.length === 1"
              >
              </v-select>
              <template v-if="code">
                <ClientOnly>
                  <CodeBlock
                    :code="code"
                    :prismjs="true"
                    :lang="`${lang === 'cc' ? 'cpp' : lang}`"
                    :theme="`${
                      theme.global.current.value.dark ? 'dark' : 'default'
                    }`"
                    persistent-copy-button
                  />
                </ClientOnly>
              </template>
              <v-skeleton-loader v-else type="paragraph" />
            </v-card-text>
            <Giscus
              id="comments"
              repo="park-jihoo/park-jihoo.github.io"
              repoId="R_kgDOJAfUTw"
              category="General"
              categoryId="DIC_kwDOJAfUT84Cas-2"
              mapping="url"
              strict="1"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              :theme="`${theme.global.current.value.dark ? 'dark' : 'light'}`"
              lang="ko"
            />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">
                <NuxtLink
                  :to="`/algorithm`"
                  style="text-decoration: none; color: inherit"
                >
                  Back to List
                </NuxtLink>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
@use "prismjs/themes/prism-dark.css";
@use "prismjs/themes/prism.css";
</style>
