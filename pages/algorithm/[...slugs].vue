<script setup>
import Prism from "prismjs";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-cpp.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-sql.js";
import { CodeBlock } from "vue3-code-block";
import { VSkeletonLoader } from "vuetify/lib/labs/components";
import { useTheme } from "vuetify";

const difficulty = ref("");
const route = useRoute();
const theme = useTheme();

const slug = route.params.slugs[2];
const platform = route.params.slugs[0];
difficulty.value = route.params.slugs[1];
const langsUrl = `https://api.github.com/repos/park-jihoo/Algorithm/contents/${platform}/${difficulty.value}/${slug}`;

const { data: langs } = useAsyncData("langs", () => $fetch('/api/algorithm').then((res) => {
    return res.filter((item) => item.slug === slug)[0].languages;
  })
);

const {data: lang} = useAsyncData("lang", () => $fetch('/api/algorithm').then((res) => {
    return res.filter((item) => item.slug === slug)[0].languages[0];
  })
);

let githubUrl = "";

watch([lang], () => {
  const file = platform !== "leetcode"
    ? `${slug.split(".")[1].trim()}.${lang.value}`
    : `${slug}.${lang.value}`;
  githubUrl = `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${platform}/${difficulty.value}/${slug}/${file}`;
});

const { data: code } = useAsyncData("code", () => $fetch(githubUrl),
  { watch: [lang] }
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
      return `https://leetcode.com/problems/${slug.replace(/\d\d\d\d-/g, "").replace(/ /g, "-")}`;
    case "프로그래머스":
      return `https://programmers.co.kr/learn/courses/30/lessons/${slug}`;
    case "백준":
      return `https://www.acmicpc.net/problem/${slug.split(".")[0]}`;
  }
};
</script>

<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col align-self="auto">
          <v-card outlined class="mb-5 elevation-4">
            <v-card-title class="headline">
              <v-chip
                class="ml-2"
                :color="getColor(difficulty)"
              >
                {{ difficulty }}
              </v-chip>
              {{ route.params.slugs[2].replace(/\d\d\d\d-/g, "").replace(/-/g, " ") }}
              <v-btn
                icon
                class="elevation-0"
                rounded="0"
                variant="text"
                :ripple="false"
                :href="getLink(route.params.slugs[0], route.params.slugs[2])"
                target="_blank"
              >
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="lang"
                :items="langs"
                label="Select Language"
                outlined
                dense
                color="primary"
                :disabled="langs.length === 1"
              >
              </v-select>
              <template v-if="langs.length > 0">
                <ClientOnly>
                  <CodeBlock
                    :code="code"
                    :prismjs="true"
                    :lang="`${lang === 'cc' ? 'cpp' : lang}`"
                    :theme="`${theme.global.current.value.dark ? 'dark' : 'default'}`"
                    persistent-copy-button
                  />
                </ClientOnly>
              </template>
              <v-skeleton-loader
                v-else
                type="paragraph"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">
                <NuxtLink :to="`/algorithm`" style="text-decoration: none; color: inherit">
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
