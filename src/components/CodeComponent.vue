<script setup>
import {onMounted, ref, computed} from 'vue';
import { useRoute } from 'vue-router';
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
            if (file.endsWith('.js')) {
                lang.value = 'javascript';
            } else if (file.endsWith('.py')) {
                lang.value = 'py';
            } else if (file.endsWith('.cpp')) {
                lang.value = 'cpp';
            } else if (file.endsWith('.java')) {
                lang.value = 'java';
            }
        })
});
</script>

<template>
    <v-sheet>
        <CodeBlock
                :code="code"
                prismjs
                :lang="lang"
                theme="default"
                height="70vh"
                persistent-copy-button
        />
    </v-sheet>

</template>

<style scoped>

</style>