<script setup>
import { NotionRenderer } from "#components";
import "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import {VSkeletonLoader} from "vuetify/lib/labs/components";

const route = useRoute();

const {$notion} = useNuxtApp();
const { data, pending } = await useLazyAsyncData("notion", ()=> $notion.getPageBlocks(route.params.slug))
</script>
<template>
  <v-container>
    <v-row no-gutters>
      <v-col align-self="start">
        <v-skeleton-loader v-if="pending" type="card, paragraph, actions" />
        <v-card class="elevation-3 pa-4" v-else>
          <NotionRenderer
              v-if="data"
              :blockMap="data"
              prismjs
              fullPage
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
</style>