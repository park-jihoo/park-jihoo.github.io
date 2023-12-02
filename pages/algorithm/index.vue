<script setup>
import { VDataTable } from "vuetify/labs/components";
import { useAlgorithmStore } from "~/stores/algorithm";
import { Octokit } from "@octokit/rest";

const router = useRouter();
const itemsPerPage = ref(10);
const headers = [
  { title: "id", key: "id", sortable: true },
  { title: "Name", key: "name", sortable: true },
  { title: "Difficulty", key: "difficulty", sortable: false },
  { title: "Languages", key: "languages", sortable: false },
];

const languageIcons = [
  { language: "java", icon: "mdi-language-java" },
  { language: "js", icon: "mdi-language-javascript" },
  { language: "py", icon: "mdi-language-python" },
  { language: "cc", icon: "mdi-language-cpp" },
  { language: "cpp", icon: "mdi-language-cpp" },
  { language: "c", icon: "mdi-language-c" },
  { language: "sql", icon: "mdi-database" },
];

const search = ref("");

const algorithmStore = useAlgorithmStore();

const { data: algorithm } = await useAsyncData("algorithm", () =>
  algorithmStore.fetchQuestions(),
);

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

const { data: posts } = await useLazyAsyncData("posts", () => {
  return fetchGithubFiles().then((data) => {
    return filterAndFormatPosts(data);
  });
});

const navigateTo = (event, data) => {
  router.replace({ path: data.item.selectable.url });
};

const { data: filteredPosts } = await useAsyncData(
  "filteredPosts",
  async () => {
    if (!posts.value) return [];
    return posts.value.filter((post) => {
      return post.name.toLowerCase().includes(search.value.toLowerCase());
    });
  },
);

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
const selectedTab = ref(platformTabs.value[0]);

const { data: selectedPlatformData } = await useAsyncData(
  "selectedPlatformData",
  async () => {
    if (!filteredPosts.value) return [];
    return filteredPosts.value.filter(
      (post) => post.platform === selectedTab.value,
    );
  },
  { watch: selectedTab },
);
</script>

<template>
  <div>
    <v-container class="my-5">
      <v-row justify="center">
        <v-col align-self="start" class="ma-2">
          <v-tabs v-model="selectedTab" grow>
            <v-tab
              v-for="(tab, index) in platformTabs"
              :key="index"
              :value="tab"
            >
              {{ tab }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col align-self="start" class="ma-2">
          <v-card class="elevation-4 rounded-lg">
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
                :loading="posts.length === 0"
                hide-default-footer
                item-class="px-4 py-2"
                @click:row="navigateTo"
              >
                <template v-slot:item.name="{ item }">
                  <nuxt-link
                    prefetch
                    :to="item.selectable.url"
                    style="text-decoration: none; color: inherit"
                  >
                    {{ item.selectable.name }}
                  </nuxt-link>
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
                  <v-chip
                    class="ma-1"
                    :color="getColor(item.selectable.difficulty)"
                    outlined
                  >
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
