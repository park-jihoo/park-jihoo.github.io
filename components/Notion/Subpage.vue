<template>
  <NuxtLink :to="`${block.id}`" class="flex flex-row items-center gap-2">
    <NotionIcon :icon="header.icon" />
    <span>
      <span>{{ block.child_page.title }}</span>
      <span> &neArr;</span>
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps(["block"]);
</script>
