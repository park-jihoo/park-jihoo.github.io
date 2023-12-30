<script setup>
const props = defineProps(["block", "number"]);
const {data: content} = await useFetch(
  `/api/notion/retrieve-block-children/${props.block.id}`
)
</script>

<template>
    <div class="flex">
        <div class="ml-2">
          {{ number }}.
        </div>
        <div class="ml-2">
            <NotionRichText :richText="block.numbered_list_item.rich_text" />
            <NotionBlock v-if="content.results.length !==0" :content="content.results"/>
        </div>
    </div>
</template>