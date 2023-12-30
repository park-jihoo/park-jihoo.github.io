<script setup>
const props = defineProps(["block"]);
const { data: content } = await useFetch(
  `/api/notion/retrieve-block-children/${props.block.id}`
);
</script>
<template>
  <v-row>
    <v-col v-for="column in content.results">
      <NotionPage :pageId="column.id" />
    </v-col>
  </v-row>
</template>