<script setup>
import { VDataTable } from "vuetify/labs/components";

const router = useRouter();
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


const { data: posts } = await useAsyncData("posts", () => {
  return fetchGithubFiles()
      .then((data) => filterAndFormatPosts(data));
});

const navigateTo = (event, data) => {
  const link = data.item.selectable.url;
  const difficulty = data.item.selectable.difficulty;
  const platform = data.item.selectable.platform;
  router.push({ path: "/algorithm/" + platform + "/" + difficulty + "/" + link });
};

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

// Define platform tabs
const platformTabs = ref(["leetcode", "백준", "프로그래머스"]); // Add other platforms as needed

// Selected tab state
const selectedTab = ref(platformTabs[0]);

// Filter posts based on selected platform
const selectedPlatformData = computed(() => {
  return filteredPosts.value.filter(post => post.platform === selectedTab.value);
});

</script>

<template>
  <div>
    <v-container class="my-5">
      <v-row justify="center">
        <v-col align-self="start" class="ma-2">
          <v-tabs v-model="selectedTab" center-active>
            <v-tab v-for="(tab, index) in platformTabs" :key="index" :value="tab">
              {{ tab }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col align-self="start" class="ma-2">
          <v-card class="elevation-4 rounded-lg" >
            <v-card-text class="pa-3">
              <v-text-field
                v-model="search"
                label="Search"
                filled
                hide-details
                clearable
                solo
                color="primary"
                placeholder="Search..."
                @click:clear="search = ''"
              >
                <template #prepend>
                  <v-icon color="primary">mdi-magnify</v-icon>
                </template>
              </v-text-field>

              <v-data-table
                v-if="selectedPlatformData"
                v-model:items-per-page="itemsPerPage"
                :headers="headers"
                :items-length="selectedPlatformData.length"
                :items="selectedPlatformData"
                :search="search"
                hover
                dense
                :loading="selectedPlatformData.length === 0 && search.length === 0"
                hide-default-footer
                item-class="px-4 py-2"
                @click:row="navigateTo"
              >
                <template v-slot:item.name="{ item }">
                  <NuxtLink :to="`/algorithm/${item.selectable.platform}/${item.selectable.difficulty}/${item.selectable.url}`"
                  style="text-decoration: none;color:inherit;"
                  >
                    {{ item.selectable.name }}
                  </NuxtLink>
                </template>
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
                  {{ item.selectable.id }}
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
  </template>
<script>
export default {
  async fetch() {
    await Promise.all([posts.value]);
  },
}
</script>