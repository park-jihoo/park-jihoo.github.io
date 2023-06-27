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
    <v-row>
        <v-col>
            <v-card>
                <v-card-title v-text="route.params.file.split('&').join('.')"/>
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
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn-group>
                <v-btn link :to="`/leetcode`">List</v-btn>
            </v-btn-group>
        </v-col>
    </v-row>

</template>

<style scoped>

</style>