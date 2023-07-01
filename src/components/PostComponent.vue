<script setup>
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {NotionRenderer, getPageBlocks, useGetPageTable} from 'vue3-notion'
import "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";

const {pageTable} = useGetPageTable('619787c75b60479886c147cf746bfbb8');
const route = useRoute();
const router = useRouter();

const post = ref({});

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    post.value = await getPageBlocks(id);
  }
});

const classes = computed(() => {
  const allClasses = pageTable.value.map(post => post.class);
  return [...new Set(allClasses)];
});

const navigateTo = (link) => {
  router.push({path: '/notes', query: {class: link}})
};

</script>
<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col align-self="auto">
        <NotionRenderer v-if="post" :blockMap="post" prism katex fullPage
                        :class="$vuetify.theme.global.current.dark ? 'dark-mode' : ''"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
@import "katex/dist/katex.min.css";
@import "vue3-notion/dist/style.css";
</style>