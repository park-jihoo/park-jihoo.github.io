<template>
  <h3 :id="block.id" class="text-h6">
    <NotionRichText :richText="block.heading_3.rich_text" />
  </h3>
</template>

<script setup>
const props = defineProps(['block'])
</script>