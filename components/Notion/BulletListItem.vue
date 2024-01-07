<script setup>
const props = defineProps(["block"]);
</script>

<template>
  <div class="flex">
    <v-icon class="ml-2">mdi-circle-small</v-icon>
    <div class="ml-2">
    <NotionRichText :richText="block.bulleted_list_item.rich_text" />
    <NotionBlock
      v-if="block.has_children"
      :content="block.children.results"
    />
    </div>
  </div>
</template>
