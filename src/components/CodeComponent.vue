<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import Prism from 'prismjs';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cpp.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-java.js';

const code = ref('');
const lang = ref('');
const route = useRoute();

onMounted(() => {
    const slug = route.params.slug;
    const file = route.params.file.split('&').join('.');
    const githubUrl = `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${slug}/${file}`;

    fetch(githubUrl)
        .then(response => response.text())
        .then(data => {
            code.value = data;
            lang.value = file.split('.').pop();
        });
});
</script>

<template>
    <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
            <v-card class="mb-4">
                <v-card-title class="font-weight-bold blue-grey darken-2 white--text" v-text="route.params.file.split('&').join('.')"/>
                <v-card-text>
                    <CodeBlock
                        :code="code"
                        prismjs
                        :lang="lang"
                        theme="default"
                        persistent-copy-button
                    />
                </v-card-text>
            </v-card>
            <v-btn color="primary" link :to="`/leetcode`">Back to List</v-btn>
        </v-col>
    </v-row>
</template>

<style scoped>
.v-card-title {
    font-size: 1.5rem;
}
</style>