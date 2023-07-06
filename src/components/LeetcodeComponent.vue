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
];
const search = ref('');

const fetchGithubFiles = async () => {
  try {
    const owner = 'park-jihoo';
    const repo = 'Algorithm';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.tree;
  } catch (error) {
    console.error(error);
  }
}

const filterAndFormatPosts = (data) => {
  return data.filter((item) => item.path.includes('-'))
      .map((item) => {
        const name = item.path.replace(/\d\d\d\d-/g, '').replace(/-/g, ' ')
        const id = item.path.split('-')[0];
        const url = item.path.replace(/\//g, '&');
        return {name, url, id};
      }).sort((a, b) => {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      });
}

const navigateTo = (event, data) => {
  const link = data.item.selectable.url;
  router.push({path: '/leetcode/' + link})
};

onMounted(async () => {
  const githubFiles = await fetchGithubFiles();
  posts.value = filterAndFormatPosts(githubFiles);
});
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
                @click:row="navigateTo"
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>