<script setup>
import {onMounted, ref} from 'vue'
import { useRoute } from 'vue-router'
import { NotionRenderer, getPageBlocks } from 'vue-notion'

const post = ref({});
const route = useRoute();

onMounted(async () => {
    const id = route.params.id;
    if (id) {
        post.value = await getPageBlocks(id);
    }
});
</script>
<template>
    <v-container>
        <v-sheet min-height="70vh" rounded="lg">
            <NotionRenderer :blockMap="post" katex fullPage/>
        </v-sheet>
    </v-container>
</template>
<style>
@import "vue-notion/src/styles.css";
@import "katex/dist/katex.min.css";
</style>