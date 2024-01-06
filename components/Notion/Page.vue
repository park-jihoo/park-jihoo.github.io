<script setup lang="ts">
const props = defineProps(["pageId"]);
const pageId = props.pageId;
const { data: page } = await useAsyncData("page", () =>
  queryContent(pageId).findOne(),
);
</script>

<template>
  <NotionBlock v-if="page" :content="page.blocks.results" />
</template>
