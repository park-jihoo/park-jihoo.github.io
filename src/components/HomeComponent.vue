<script setup>
import {onMounted, ref, computed} from 'vue'

const posts = ref([])
onMounted(() => {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            posts.value = data.posts;
        });
});

const page = ref(1);
const postsPerPage = 10;

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
        <v-card>
            <v-list lines="one">
                <v-list-item v-for="post in paginatedPosts"
                             :key="post.id"
                             link
                             :to="{path:'/post/'+post.id}">
                    <v-list-item-title v-text="post.title"/>
                    <v-list-item-action>
                        <v-chip-group>
                            <v-chip v-for="tag in post.tags" :key="tag">{{ tag }}</v-chip>
                        </v-chip-group>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            <v-pagination
                v-model="page"
                :length="totalPages"
                circle
                color="primary"
                background-color="white"
            />
        </v-card>
    </v-container>
</template>
