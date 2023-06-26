<script setup>
import {onMounted, ref, computed} from 'vue'

const posts = ref([])
const categories = [
    'RL',
    'CS',
    'DB',
    'ML',
]
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
        <v-row>
            <v-col>
                <v-sheet min-height="70vh" rounded="lg">
                    <v-list lines="one">
                        <v-list-item v-for="post in paginatedPosts"
                                     :key="post.id"
                                     link
                                     :to="{path:'/til/'+post.id}">
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
                            background-color="white"
                    />
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
