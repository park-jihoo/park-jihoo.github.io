<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "~/lib/blockable";
import NotionTextRenderer from "./helpers/text-renderer.vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { title, pass } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionToggle",
};
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel elevation="0" :hide-actions="true">
      <v-expansion-panel-title>
        <NotionTextRenderer :text="title" v-bind="pass" />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <slot />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
