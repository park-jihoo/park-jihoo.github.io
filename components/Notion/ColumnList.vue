<script setup>
const props = defineProps(["block"]);
</script>
<template>
  <v-row>
    <v-col v-for="column in block.children.results">
      <NotionBlock :content="column.children.results"/>
    </v-col>
  </v-row>
</template>
