<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "~/lib/blockable";
import NotionAsset from "./asset.vue";
import NotionImage from "./image.vue";
import NotionGoogleDrive from "./google-drive.vue";
import NotionTextRenderer from "./text-renderer.vue";

const props = defineProps({ ...defineNotionProps });
//@ts-ignore
const { pass, width, caption, isType } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionFigure",
};
</script>
<template>
  <figure class="notion-asset-wrapper" :style="[isType('image') ? 'width:100%' : '']">
    <NotionImage v-if="isType('image')" v-bind="pass" />
    <NotionAsset v-else-if="isType(['embed', 'video', 'figma', 'maps'])" v-bind="pass" />
    <NotionGoogleDrive v-else-if="isType('drive')" v-bind="pass" />
    <figcaption v-if="caption" class="notion-image-caption">
      <NotionTextRenderer :text="caption" v-bind="pass" />
    </figcaption>
  </figure>
</template>
