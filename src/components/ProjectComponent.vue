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
        <v-row>
            <v-col cols="2">
                <v-sheet rounded="lg">
                    <v-list rounded="lg">
                        <v-list-item v-for="n in 5" :key="n" link>
                            <v-list-item-title>Item {{ n }}</v-list-item-title>
                        </v-list-item>
                        <v-divider class="my-2"></v-divider>
                        <v-list-item link color="grey-lighten-4">
                            <v-list-item-title>Refresh</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-sheet>
            </v-col>
            <v-col>
                <v-sheet min-height="70vh" rounded="lg">
                    <v-list lines="one">
                        <v-list-item v-for="post in paginatedPosts"
                                     :key="post.id"
                                     link
                                     :to="{path:'/projects/'+post.id}">
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
