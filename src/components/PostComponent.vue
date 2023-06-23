<script setup>
import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'

const post = ref({});
const route = useRoute();

onMounted(() => {
    const id = route.params.id;
    if (id) {
        fetch('https://dummyjson.com/posts/'+id)
            .then(response => response.json())
            .then(data => {
                post.value = data;
                console.log(data);
            });
    }
});
</script>
<template>
    <v-container>
            <v-card-title class="headline">{{ post.title }}</v-card-title>
            <v-card-text>{{ post.body }}</v-card-text>
            <v-card-actions>
                <v-chip v-for="tag in post.tags" :key="tag" class="mr-2 mb-2">{{ tag }}</v-chip>
            </v-card-actions>
    </v-container>
</template>