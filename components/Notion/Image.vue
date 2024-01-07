<script setup>
const props = defineProps(["block"]);
</script>
<template>
  <div class="flex flex-col">
    <label :for="block.id" class="modal-button cursor-pointer not-prose">
      <NuxtImg :src="block.image[block.image.type].url" class="mb-0" />
    </label>
    <div v-if="block.image.caption" class="text-xs font-normal mt-1 text-center">
      <NotionRichText :rich-text="block.image.caption" />
    </div>
  </div>
</template>