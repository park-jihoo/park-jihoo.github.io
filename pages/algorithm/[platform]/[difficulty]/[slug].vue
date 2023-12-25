<script setup>
import { useTheme } from "vuetify";
import { useAlgorithmStore } from "~/stores/algorithm";
import Giscus from "@giscus/vue";
import { addClassToHast, getHighlighter } from "shikiji";
import { useClipboard } from "@vueuse/core";

const difficulty = ref("");
const route = useRoute();
const theme = useTheme();

const slug = route.params.slug;
const platform = route.params.platform;
difficulty.value = route.params.difficulty;

const algorithmStore = useAlgorithmStore();
const shiki = await getHighlighter({
  themes: ["github-light", "github-dark"],
  langs: ["cpp", "java", "python", "sql", "c", "js"],
});

const { data: lang } = await useLazyAsyncData(
  "posts",
  async () => {
    const post = await algorithmStore.getQuestions;
    const langs = post.filter((post) => post.slug === slug)[0].languages;
    const file = platform !== "leetcode" ? slug.split(".")[1].trim() : slug;
    const codes = [];

    for (const l of langs) {
      const la = l === "cc" ? "cpp" : l;
      const githubUrl = `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty.value}/${slug}/${file}.${l}`;
      const res = await $fetch(githubUrl);
      codes.push(res);
    }
    return { langs: langs, lang: langs[0], codes: codes };
  },
  { watch: [route] },
);

const { text, copy, copied, isSupported } = useClipboard();

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
                v-if="lang.langs && lang.lang"
                v-model:model-value="lang.lang"
                :items="lang.langs"
                label="Select Language"
                outlined
                dense
                color="primary"
                :disabled="lang.langs.length === 1"
              >
              </v-select>

              <template v-if="lang.codes">
                <div style="position: relative">
                  <v-btn
                    :icon="!copied ? `mdi-content-copy` : `mdi-check`"
                    class="elevation-0"
                    rounded="0"
                    variant="text"
                    :ripple="false"
                    @click="copy(lang.codes[lang.langs.indexOf(lang.lang)])"
                    style="position: absolute; right: 0; top: 0"
                  />
                  <div
                    v-html="
                      shiki.codeToHtml(
                        lang.codes[lang.langs.indexOf(lang.lang)],
                        {
                          lang: lang.lang === 'cc' ? 'cpp' : lang.lang,
                          theme: theme.global.current.value.dark
                            ? 'github-dark'
                            : 'github-light',
                          mergeWhitespaces: true,
                          transformers: [
                            {
                              code(hast) {
                                addClassToHast(hast, 'font-mono')
                              }
                            },
                          ],
                        },
                      )
                    "
                  />
                </div>
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
              class="mt-4"
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
