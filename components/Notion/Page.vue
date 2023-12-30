<script setup lang="ts">

const props = defineProps(["pageId"]);

const {data: content} = await useFetch(
  `/api/notion/retrieve-block-children/${props.pageId}`
)
</script>

<template>
  <NotionBlock :content="content.results"/>
</template>
