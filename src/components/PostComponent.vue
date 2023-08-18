<script setup>
import {
  onMounted,
  onUpdated,
  ref
} from "vue";
import { useRoute } from "vue-router";
import NotionRenderer from "./notion-renderer.vue";
import { getPageBlocks, getPageTable } from "../lib/api";
import mermaid from "mermaid";
import "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

import { CodeBlock } from "vue3-code-block";

const route = useRoute();

const post = ref(null);
const table = ref(null);
const title = ref(null);
const pdf = ref(null);
const page = ref(null);

onMounted(async () => {
  const id = route.params.id;
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
    console.log( page.value.content);
  }
  mermaid.initialize({ startOnLoad: true });
});

const renderMermaid = () => {
  mermaid.init(undefined, document.getElementsByClassName("language-mermaid"));
};

</script>
<template>
  <v-container>
    <v-row no-gutters>
      <v-col align-self="start">
        <v-card class="elevation-3 pa-4">
          <v-card-title class="mt-2 text-wrap text-h4">
            {{ title }}
            <v-btn-group>
              <v-btn
                v-for="file in pdf"
                :key="file.name"
                :href="file.name"
                target="_blank"
                icon
                class="ma-1"
              >
                <v-icon>mdi-file-outline</v-icon>
              </v-btn>
            </v-btn-group>
          </v-card-title>
            <NotionRenderer
                      v-if="post"
                      :blockMap="post"
                      katex
                      :class="$vuetify.theme.global.current.dark ? 'dark-mode ma-3' : 'ma-3'"
                      @click="renderMermaid"
                    />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
@import "katex/dist/katex.min.css";
@import "prismjs/themes/prism.css";
@import "style.css";
</style>