<script setup>
import {onMounted, ref, computed} from 'vue';
import {useRouter} from "vue-router";
import {VDataTable} from "vuetify/labs/components";

const router = useRouter();
const posts = ref([]);
const itemsPerPage = ref(10);
const headers = [
  {title: 'id', key: 'id', sortable: true},
  {title: 'Name', key: 'name', sortable: true},
  {title: 'Languages', key: 'languages', sortable:false},
];

const languageIcons = [
  {language: 'java', icon: 'mdi-language-java'},
  {language: 'js', icon: 'mdi-language-javascript'},
  {language: 'py', icon: 'mdi-language-python'},
  {language: 'cpp', icon: 'mdi-language-cpp'},
  {language: 'c', icon: 'mdi-language-c'},
  {language: 'sql', icon: 'mdi-database'},
]
const search = ref('');

const fetchGithubFiles = async () => {
  try {
    const owner = 'park-jihoo';
    const repo = 'Algorithm';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
    const response = await fetch(apiUrl);
    let data = await response.json();
    data = data.tree.filter((item) => item.type === 'blob')
        .filter((item) => item.path.startsWith('0') || item.path.startsWith('1') || item.path.startsWith('2'))
        .filter((item) => !item.path.includes('.md'))
    return data
  } catch (error) {
    console.error(error);
  }
}

const filterAndFormatPosts = async (data) => {
  let questions = [];
  for (const item of data) {
    const path = item.path.split('/');
    if (questions.map((item) => item.url).includes(path[0])) {
      const index = questions.findIndex((question) => question.url === path[0]);
      questions[index].languages.push(path[1].split('.').pop());
    } else {
      questions.push({
        id: path[0].split('-')[0],
        url: path[0],
        name: path[0].replace(/-/g, ' ').replace(/\d\d\d\d/g, '').trim(),
        languages: [path[1].split('.').pop()],
        difficulty: await getDifficulties(path[0]),
      });
    }
  }
  return questions;
}

const navigateTo = (event, data) => {
  const link = data.item.selectable.url;
  router.push({path: '/leetcode/' + link})
};

onMounted(async () => {
  const githubFiles = await fetchGithubFiles();
  posts.value = await filterAndFormatPosts(githubFiles);
});

const getDifficulties = async (slug) => {
  const readmeUrl = `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${slug}/README.md`;
  const difficulty = await fetch(readmeUrl)
      .then((response) => response.text())
      .then((text) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(text, 'text/html');
        return doc.querySelector('h3').innerText;
      })
      .catch((error) => {
        console.error(slug, error);
      });
  return difficulty;
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col align-self="auto">
        <v-card class="pa-3 elevation-2">
          <v-card-title
              class="headline text-center text-uppercase grey lighten-2"
          >
            LeetCode Solutions
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                filled
                hide-details
                class="ma-1"
            ></v-text-field>
            <v-data-table
                v-model:items-per-page="itemsPerPage"
                :headers="headers"
                :items-length="posts.length"
                :items="posts"
                :search="search"
                hover
                dense
                hide-default-footer
                item-class="px-4 py-2"
                @click:row="navigateTo"
            >
              <template v-slot:item.languages="{ item }">
                <v-icon v-for="language in item.selectable.languages" :key="language"
                color="primary"
                >
                  {{ languageIcons.find((icon) => icon.language === language).icon }}
                </v-icon>
              </template>
              <template v-slot:item.name="{ item }">
                <v-chip
                    :color="item.selectable.difficulty === 'Easy' ? 'success' : item.selectable.difficulty === 'Medium' ? 'warning' : 'error'"
                    text-color="white"
                    small
                >
                  {{ item.selectable.difficulty }}
                </v-chip>
                {{item.selectable.name }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>