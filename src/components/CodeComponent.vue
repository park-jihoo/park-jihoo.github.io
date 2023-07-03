<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Prism from 'prismjs';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cpp.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-java.js';
import { CodeBlock } from 'vue3-code-block';
import { useTheme } from 'vuetify';

const code = ref('');
const lang = ref('');
const langs = ref([]);
const route = useRoute();
const theme = useTheme();

onMounted(() => {
  const slug = route.params.slug;
  const langsUrl = `https://api.github.com/repos/park-jihoo/Algorithm/contents/${slug}`;
  fetch(langsUrl)
      .then((response) => response.json())
      .then((data) => {
        langs.value = data.filter((item) => item.name !== 'README.md').map((item) => item.name.split('.')[1]);
        lang.value = langs.value[0];
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
        <v-card class="mb-4">
          <v-card-title
              v-text="route.params.slug.replace(/\d\d\d\d-/g, '').replace(/-/g, ' ')"
          />
          <v-card-text>
            <v-select
                v-model="lang"
                :items="langs"
                label="Select Language"
            ></v-select>
            <CodeBlock
                :code="code"
                prismjs
                :lang="lang"
                :theme="`${theme.global.current.value.dark ? 'neon-bunny-carrot' : 'default'}`"
                persistent-copy-button
            />
          </v-card-text>
        </v-card>
        <v-btn color="primary" link :to="`/leetcode`">Back to List</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card-title {
    font-size: 1.5rem;
}
</style>