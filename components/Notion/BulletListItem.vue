<script setup>
const props = defineProps(["block"]);
</script>

<template>
  <div>
    <v-icon class="mr-1">mdi-circle-small</v-icon>
    <NotionRichText :richText="block.bulleted_list_item.rich_text" />
    <NotionBlock
      v-if="block.has_children"
      :content="block.children.results"
    />
  </div>
</template>
