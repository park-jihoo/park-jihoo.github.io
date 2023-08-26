<script setup>
import { getPageBlocks, getPageTable, NotionRenderer } from "vue3-notion";
import "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import {VSkeletonLoader} from "vuetify/lib/labs/components";

import { CodeBlock } from "vue3-code-block";
const route = useRoute();
const post = ref(null);
const table = ref(null);
const title = ref(null);
const pdf = ref(null);
const page = ref(null);
onMounted(async () => {
  const id = route.params.slug;
  if (id) {
    post.value = await getPageBlocks(id);
    table.value = await getPageTable(id);
    for (let row of table.value) {
      if (row.id === id) {
        title.value = row.title;
        if (row.pdf)
          pdf.value = row.pdf;
        break;
      }
    }

    for (let block in post.value){
      if (post.value[block].value.type === "page") {
        page.value = post.value[block].value;
        break;
      }
    }
  }
});

</script>
<template>
  <v-container>
    <v-row no-gutters>
      <v-col align-self="start">
        <v-skeleton-loader v-if="!post" type="card, paragraph, actions" />
        <v-card class="elevation-3 pa-4" v-if="post">
          <NotionRenderer
              v-if="post"
              :blockMap="post"
              katex
              :class="$vuetify.theme.global.current.dark ? 'dark-mode ma-3' : 'ma-3'"
          />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" link :to="`/notes`">Back to List</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
@import "katex/dist/katex.min.css";
@import "prismjs/themes/prism.css";
@import "vue3-notion/dist/style.css";
</style>