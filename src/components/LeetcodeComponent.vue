<script setup>
import {onMounted, ref, computed} from 'vue';

const posts = ref([]);

const fetchGithubFiles = async () => {
  try {
    const owner = 'park-jihoo';
    const repo = 'Algorithm';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.tree;
  } catch (error) {
    console.error(error);
  }
}

const filterAndFormatPosts = (data) => {
  return data
      .filter(({
                 type,
                 path
               }) => type === 'blob' && (path.endsWith('.js') || path.endsWith('.py') || path.endsWith('.cpp') || path.endsWith('.java')) && path.includes('-'))
      .map(({path}) => {
        const name = path.split('/')[1].replace(/-/g, ' ').replace(/^\d\d\d\d/g, '').trim();
        const url = path.split('.')[0] + '&' + path.split('.')[1];
        return {name, url};
      })
      .sort((a, b) => a.name.localeCompare(b.name));
}

const itemsPerPage = ref(10);
const currentPage = ref(1);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return posts.value.slice(start, end);
});

const numberOfPages = computed(() => Math.ceil(posts.value.length / itemsPerPage.value));

onMounted(async () => {
  const githubFiles = await fetchGithubFiles();
  posts.value = filterAndFormatPosts(githubFiles);
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col align-self="auto">
        <v-card class="pa-3" outlined elevation="2">
          <v-card-title class="headline mb-2">LeetCode Solutions</v-card-title>
          <v-divider></v-divider>
          <v-list two-line flat>
              <v-list-item
                  v-for="post in paginatedPosts"
                  :key="post.url"
                  link
                  :to="{path:'/leetcode/'+post.url}"
              >
                  <v-list-item-title>{{ post.name }}</v-list-item-title>
              </v-list-item>
          </v-list>
          <v-pagination
              v-model="currentPage"
              :length="numberOfPages"
              color="primary"
              class="my-4"
          ></v-pagination>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>