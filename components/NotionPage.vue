<script setup lang="ts">
import { Client } from "@notionhq/client";

const props = defineProps(["pageId"]);

const databaseId = "619787c75b60479886c147cf746bfbb8";
const notion = new Client({
  auth: "secret_SLclwcn6eZqxYJWyM7kueTRykHWMpr9lxfnlCqKra25",
});
const block = await notion.blocks.retrieve({ block_id: props.pageId });
const child = await notion.blocks.children.list({ block_id: props.pageId });
</script>

<template>
  <v-card-title>
    {{ block.child_page.title }}
  </v-card-title>
    <div v-for="c in child.results">
      <NotionBlock :blockId="c.id" class="ma-2" />
    </div>
</template>
