<script setup>
import { onMounted, ref, computed } from 'vue';
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
                .sort((a, b) => {
                    const aName = a.split('/')[1].replace(/-/g, ' ').replace(/[0-9]/g, '').trim();
                    const bName = b.split('/')[1].replace(/-/g, ' ').replace(/[0-9]/g, '').trim();
                    return aName.localeCompare(bName);
                });

            posts.value = filePaths.map(path => {
                const name = path.split('/')[1].replace(/-/g, ' ').replace(/[0-9]/g, '').trim();
                const url = path.split('.')[0] + '&' + path.split('.')[1];
                return {name, url};
            });
        })
        .catch(console.error);
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
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="pa-5" elevation="2" outlined>
                    <v-list two-line>
                        <v-list-item v-for="post in paginatedPosts" :key="post.url" link :to="{path:'/leetcode/'+post.url}">
                            <v-list-item-content>
                                <v-list-item-title class="font-weight-bold" v-text="post.name"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                    <div class="d-flex justify-center mt-5">
                        <v-pagination v-model="page" :length="totalPages" color="primary" :total-visible="10" />
                    </div>
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
    background-color: rgba(0,0,0,0.1);
}
</style>
