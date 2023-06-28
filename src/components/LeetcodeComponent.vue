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
  } catch(error) {
    console.error(error);
  }
}

const filterAndFormatPosts = (data) => {
  return data
      .filter(({ type, path }) => type === 'blob' && (path.endsWith('.js') || path.endsWith('.py') || path.endsWith('.cpp') || path.endsWith('.java')) && path.includes('-'))
      .map(({ path }) => {
        const name = path.split('/')[1].replace(/-/g, ' ').replace(/^\d\d\d\d/g, '').trim();
        const url = path.split('.')[0] + '&' + path.split('.')[1];
        return {name, url};
      })
      .sort((a, b) => a.name.localeCompare(b.name));
}

onMounted(async () => {
  const githubFiles = await fetchGithubFiles();
  posts.value = filterAndFormatPosts(githubFiles);
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-5" elevation="2" outlined>
          <v-list two-line>
            <v-list-item
                v-for="post in posts"
                :key="post.url"
                link
                :to="{path:'/leetcode/'+post.url}"
                class="d-flex">
              <v-list-item-title
                  class="font-weight-bold"
                  v-text="post.name">
              </v-list-item-title>
              <v-spacer />
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>
.v-list-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
