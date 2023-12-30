<script setup>
const props = defineProps(["block"]);
const {data: content} = await useFetch(
  `/api/notion/retrieve-block-children/${props.block.id}`
)
</script>

<template>
  <div>
    <v-icon class="mr-1">mdi-circle-small</v-icon>
    <NotionRichText :richText="block.bulleted_list_item.rich_text"/>
    <NotionBlock v-if="content.results.length !== 0" :content="content.results"/>
  </div>
</template>