<template>
  <h2 :id="block.id" class="text-h5">
    <NotionRichText :richText="block.heading_2.rich_text" />
  </h2>
</template>

<script setup>
const props = defineProps(['block'])
</script>