<script setup>
const props = defineProps(["block"]);
</script>

<template>
  <blockquote class="blockquote">
    <NotionRichText :richText="block.quote.rich_text" />
  </blockquote>
</template>
