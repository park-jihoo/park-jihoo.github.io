<script setup>
const props = defineProps(["block", "number"]);
</script>

<template>
  <div class="flex">
    <div class="ml-2">{{ number }}.</div>
    <div class="ml-2">
      <NotionRichText :richText="block.numbered_list_item.rich_text" />
      <NotionBlock
        v-if="block.has_children"
        :content="block.children.results"
      />
    </div>
  </div>
</template>
