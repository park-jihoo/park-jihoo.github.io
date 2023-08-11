<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { VDataTable } from "vuetify/labs/components";
import { VDataTableServer } from "vuetify/labs/components";

const router = useRouter();
const posts = ref([]);
const itemsPerPage = ref(10);
const headers = [
  { title: "id", key: "id", sortable: true },
  { title: "Name", key: "name", sortable: true },
  { title: "Languages", key: "languages", sortable: false },
];

const languageIcons = [
  { language: "java", icon: "mdi-language-java" },
  { language: "js", icon: "mdi-language-javascript" },
  { language: "py", icon: "mdi-language-python" },
  { language: "cpp", icon: "mdi-language-cpp" },
  { language: "c", icon: "mdi-language-c" },
  { language: "sql", icon: "mdi-database" },
];
const search = ref("");

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
          item.path.startsWith("0") ||
          item.path.startsWith("1") ||
          item.path.startsWith("2"),
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
    if (questions.map((item) => item.url).includes(path[0])) {
      const index = questions.findIndex((question) => question.url === path[0]);
      questions[index].languages.push(path[1].split(".").pop());
    } else {
      questions.push({
        id: path[0].split("-")[0],
        url: path[0],
        name: path[0]
          .replace(/-/g, " ")
          .replace(/\d\d\d\d/g, "")
          .trim(),
        languages: [path[1].split(".").pop()],
      });
    }
  }
  return questions;
};

const navigateTo = (event, data) => {
  const link = data.item.selectable.url;
  router.push({ path: "/leetcode/" + link });
};

onMounted(async () => {
  const githubFiles = await fetchGithubFiles();
  posts.value = await filterAndFormatPosts(githubFiles);
});

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    return post.name.toLowerCase().includes(search.value.toLowerCase());
  });
});

const getLanguageIcon = (language) => {
  const languageInfo = languageIcons.find((icon) => icon.language === language);
  return languageInfo ? languageInfo.icon : "";
};

const getLanguageColor = (language) => {
  const languageInfo = languageIcons.find((icon) => icon.language === language);
  return languageInfo ? "primary" : "";
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="elevation-4">
          <v-card-title class="text-center text-uppercase text-grey">
            LeetCode Solutions
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search"
              filled
              hide-details
              class="ma-1"
              clearable
              solo
              color="primary"
              placeholder="Search..."
            >
              <template #prepend>
                <v-icon>mdi-magnify</v-icon>
              </template>
            </v-text-field>
            <v-data-table
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="filteredPosts.length"
              :items="filteredPosts"
              :search="search"
              hover
              dense
              hide-default-footer
              item-class="px-4 py-2"
              @click:row="navigateTo"
            >
              <template v-slot:item.languages="{ item }">
                <v-chip
                  v-for="language in item.selectable.languages"
                  :key="language"
                  :color="getLanguageColor(language)"
                  class="ma-1"
                >
                  <v-icon class="mr-2">{{ getLanguageIcon(language)}}</v-icon>
                  {{ language }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
