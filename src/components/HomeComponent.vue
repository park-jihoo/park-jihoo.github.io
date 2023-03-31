<script setup>
import {onMounted, ref} from 'vue'
const posts = ref([])
onMounted(() => {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            posts.value = data.posts;
        });
});
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="8">
                <v-card class="mb-4" v-for="post in posts" :key="post.id">
                    <router-link :to="{name: 'Post', params: { id: post.id }}">
                      <v-card-title class="headline">{{ post.title }}</v-card-title>
                    </router-link>
                    <v-card-actions>
                        <v-chip v-for="tag in post.tags" :key="tag" class="mr-2 mb-2">{{ tag }}</v-chip>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>