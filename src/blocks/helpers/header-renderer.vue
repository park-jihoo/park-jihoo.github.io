<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "../../lib/blockable";
import NotionTextRenderer from "./text-renderer.vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { type, title, pass, block } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionHeaderRenderer",
};
</script>

<template>
  <v-card-title class="notion-h1" :id="block.value.id" v-if="type === 'header'">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </v-card-title>
  <v-card-title class="notion-h2" :id="block.value.id" v-else-if="type === 'sub_header'">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </v-card-title>
  <v-card-title class="notion-h3" :id="block.value.id" v-else-if="type === 'sub_sub_header'">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </v-card-title>
</template>
