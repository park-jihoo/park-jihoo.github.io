<script setup>
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {NotionRenderer, getPageBlocks, getPageTable} from 'vue-notion'
import "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";

const pageTable = ref([]);
const post = ref({});
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const id = route.params.id;
  pageTable.value = await getPageTable('619787c75b60479886c147cf746bfbb8');
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
    <v-navigation-drawer permanent class="grey lighten-4 elevation-1">
      <v-list dense>
        <v-list-item v-for="className in classes" :key="className" @click="navigateTo(className)">
          <v-list-item-title class="grey--text text--darken-1">{{ className }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-row no-gutters>
      <v-col align-self="auto">
        <NotionRenderer :blockMap="post" prism katex fullPage/>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
@import "vue-notion/src/styles.css";
@import "katex/dist/katex.min.css";
</style>