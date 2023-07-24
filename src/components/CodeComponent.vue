<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Prism from 'prismjs';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cpp.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-sql.js';
import { CodeBlock } from 'vue3-code-block';
import { useTheme } from 'vuetify';

const code = ref('');
const lang = ref('');
const difficulty = ref('');
const langs = ref([]);
const route = useRoute();
const theme = useTheme();

onMounted(() => {
  const slug = route.params.slug;
  const langsUrl = `https://api.github.com/repos/park-jihoo/Algorithm/contents/${slug}`;
  fetch(langsUrl)
      .then((response) => response.json())
      .then((data) => {
        langs.value = data.filter((item) => !item.name.includes('.md')).map((item) => item.name.split('.')[1]);
        lang.value = langs.value[0];
      });

  const readmeUrl = `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${slug}/README.md`;
  fetch(readmeUrl)
      .then((response) => response.text())
      .then((data) => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, 'text/html');
        difficulty.value = doc.querySelector('h3').innerText
      });
});

watch(lang, (newLang) => {
  // Reload code based on the selected language
  const slug = route.params.slug;
  const file = route.params.slug+'.'+newLang;
  const githubUrl = `https://raw.githubusercontent.com/park-jihoo/Algorithm/main/${slug}/${file}`;

  fetch(githubUrl)
      .then((response) => response.text())
      .then((data) => {
        code.value = data;
        lang.value = newLang;
      });
});
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col align-self="auto">
        <v-card outlined class="mb-5 elevation-2">
          <v-card-title class="headline">
            <v-chip
                class="ml-2"
                :color="difficulty === 'Easy' ? 'green' : difficulty === 'Medium' ? 'orange' : 'red'"
                dark
            >
              {{ difficulty }}
            </v-chip>
            {{ route.params.slug.replace(/\d\d\d\d-/g, '').replace(/-/g, ' ') }}
            <v-btn icon
                   class="elevation-0"
                   rounded="0"
                   :variant="'text'"
                   :ripple="false"
                   :href="`https://leetcode.com/problems/${route.params.slug.replace(/\d\d\d\d-/g, '')}`" target="_blank"
            >
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-select
                v-model="lang"
                :items="langs"
                label="Select Language"
                outlined
                dense
                color="primary"
                :disabled="langs.length === 1"
            ></v-select>
            <CodeBlock
                :code="code"
                :prismjs="true"
                :lang="lang"
                :theme="`${theme.global.current.value.dark ? 'dark' : 'default'}`"
                persistent-copy-button
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" link :to="`/leetcode`">Back to List</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
@use 'prismjs/themes/prism-dark.css';
@use 'prismjs/themes/prism.css';
</style>
