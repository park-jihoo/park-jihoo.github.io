<script setup lang="ts">
const props = defineProps(["pageId"]);
const pageId = props.pageId;
const { data: page } = await useAsyncData("page", () =>
  queryContent(pageId).findOne(),
);
</script>

<template>
  <div class="max-w-2xl mx-auto my-8">
    <h1 class="text-h3 mb-4">
      <NotionRichText v-if="page" :rich-text="page.properties.title.title" />
    </h1>
    <NotionBlock v-if="page" :content="page.blocks.results" />
  </div>
</template>
