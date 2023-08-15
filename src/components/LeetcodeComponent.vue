<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { VDataTable } from "vuetify/labs/components";

const router = useRouter();
const posts = ref([]);
const itemsPerPage = ref(10);
const headers = [
  { title: "id", key: "id", sortable: true },
  { title: "Name", key: "name", sortable: true },
  { title: "Difficulty", key: "difficulty", sortable: false },
  { title: "Languages", key: "languages", sortable: false }
];

const languageIcons = [
  { language: "java", icon: "mdi-language-java" },
  { language: "js", icon: "mdi-language-javascript" },
  { language: "py", icon: "mdi-language-python" },
  { language: "cc", icon: "mdi-language-cpp" },
  { language: "cpp", icon: "mdi-language-cpp" },
  { language: "c", icon: "mdi-language-c" },
  { language: "sql", icon: "mdi-database" }
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

const navigateTo = (event, data) => {
  const link = data.item.selectable.url;
  const difficulty = data.item.selectable.difficulty;
  const platform = data.item.selectable.platform;
  router.push({ path: "/algorithm/" + platform + "/" + difficulty + "/" + link });
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

const getColor = (query) => {
  switch (query) {
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

</script>

<template>
  <v-container class="my-5">
    <v-row justify="center">
      <v-col align-self="start" class="ma-2">
        <v-card class="elevation-4 rounded-lg">
          <v-card-title class="text-center text-h5">
            LeetCode Solutions
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search"
              filled
              hide-details
              clearable
              solo
              color="primary"
              placeholder="Search..."
            >
              <template #prepend>
                <v-icon color="primary">mdi-magnify</v-icon>
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
              :loading="filteredPosts.length === 0"
              hide-default-footer
              item-class="px-4 py-2"
              @click:row="navigateTo"
            >
              <template v-slot:item.languages="{ item }">
                <v-chip
                  v-for="language in item.selectable.languages"
                  :key="language"
                  class="ma-1"
                  :color="getColor(item.selectable.difficulty)"
                  outlined
                >
                  <v-icon left>{{ getLanguageIcon(language) }}</v-icon>
                  {{ language }}
                </v-chip>
              </template>
              <template v-slot:item.difficulty="{ item }">
                <v-chip class="ma-1" :color="getColor(item.selectable.difficulty)" outlined>
                  {{ item.selectable.difficulty }}
                </v-chip>
              </template>
              <template v-slot:item.id="{ item }">
                {{ item.selectable.platform === "leetcode" ? "L" : (item.selectable.platform === "백준" ? "B" : "P") }} -
                {{ item.selectable.id }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
