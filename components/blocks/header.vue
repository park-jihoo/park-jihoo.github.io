<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "~/lib/blockable";
import NotionHeaderRenderer from "./helpers/header-renderer.vue";
import NotionRenderer from "../notion-renderer.vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { type, title, pass, block, format } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionHeader",
};
</script>

<template>
  <!--  <details v-if="format?.toggleable" class="notion-toggle">-->
  <!--    <summary><NotionHeaderRenderer class="notion-h" v-bind="pass"></NotionHeaderRenderer></summary>-->
  <!--    <div>-->
  <!--      <NotionRenderer-->
  <!--        v-for="(contentId, contentIndex) in block.value.content"-->
  <!--        v-bind="pass"-->
  <!--        :key="contentId"-->
  <!--        :level="pass.level + 1"-->
  <!--        :content-id="contentId"-->
  <!--        :content-index="contentIndex"-->
  <!--      ></NotionRenderer>-->
  <!--    </div>-->
  <!--  </details>-->
  <v-expansion-panels v-if="format?.toggleable">
    <v-expansion-panel elevation="0" :hide-actions="true">
      <v-expansion-panel-title>
        <NotionHeaderRenderer :text="title" v-bind="pass" />
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <NotionRenderer
          v-for="(contentId, contentIndex) in block.value.content"
          v-bind="pass"
          :key="contentId"
          :level="pass.level + 1"
          :content-id="contentId"
          :content-index="contentIndex"
        ></NotionRenderer>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <NotionHeaderRenderer v-else v-bind="pass"></NotionHeaderRenderer>
</template>
