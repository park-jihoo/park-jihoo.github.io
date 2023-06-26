<script setup>
import {onMounted, ref, computed} from 'vue';
const posts = ref([]);

onMounted( () => {
    const owner = 'park-jihoo';
    const repo = 'Algorithm';

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const filePaths = data.tree
                .filter(item => item.type === 'blob')
                .map(item => item.path)
                .filter(path => path.endsWith('.js') || path.endsWith('.py') || path.endsWith('.cpp') || path.endsWith('.java'))
                .filter(path => path.includes('-'))

            posts.value = filePaths.map(path => {
                const name = path.split('/')[1].replace(/-/g, ' ').replace(/[0-9]/g, '').trim();
                const url = path.split('.')[0] + '&' + path.split('.')[1];
                return {name, url};
            });
        })
        .catch(error => {
            console.error(error);
        });

});

const page = ref(1);
const postsPerPage = 15;

const paginatedPosts = computed(() => {
    const start = (page.value - 1) * postsPerPage;
    return posts.value.slice(start, start + postsPerPage);
});

const totalPages = computed(() => {
    return Math.ceil(posts.value.length / postsPerPage);
});

</script>

<template>
  <v-container>
      <v-row>
          <v-col>
              <v-sheet min-height="70vh" rounded="lg">
                  <v-list lines="one">
                      <v-list-item v-for="post in paginatedPosts"
                                   :key="post.id"
                      link :to="{path:'/leetcode/'+post.url}"
                      >
                          <v-list-item-title v-text="post.name"/>
                      </v-list-item>
                  </v-list>
                  <v-pagination
                          v-model="page"
                          :length="totalPages"
                          circle
                          background-color="white"
                  />
              </v-sheet>
          </v-col>
      </v-row>
  </v-container>

</template>

<style scoped>

</style>