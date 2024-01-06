<script setup>
const props = defineProps(["block"]);
</script>
<template>
  <v-expansion-panels variant="accordion">
    <v-expansion-panel elevation="0">
      <v-expansion-panel-title>
        <NotionHeading1
          class="collapse-title"
          v-if="block.type === 'heading_1'"
          :block="block"
        >
        </NotionHeading1>
        <NotionHeading2
          class="collapse-title"
          v-else-if="block.type === 'heading_2'"
          :block="block"
        >
        </NotionHeading2>
        <NotionHeading3
          class="collapse-title"
          v-else-if="block.type === 'heading_3'"
          :block="block"
        >
        </NotionHeading3>
        <span v-else class="collapse-title">
          <NotionRichText :richText="block[block.type].rich_text" />
        </span>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="collapse-content">
        <NotionBlock :content="block.children.results" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
