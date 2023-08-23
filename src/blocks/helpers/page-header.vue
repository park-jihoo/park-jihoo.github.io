<script setup lang="ts">
import { defineNotionProps, useNotionBlock } from "../../lib/blockable";
import Decorator from "../decorator.vue";
import { ref } from "vue";

const props = defineProps({ overrideLang: String, overrideLangClass: String, ...defineNotionProps });
//@ts-ignore
const { properties, block } = useNotionBlock(props);

const breadcrumbs = ref(["","",""]);
breadcrumbs.value[0] = properties.value["[qIJ"][0][0];
breadcrumbs.value[1] = properties.value["Q}G_"][0][0];
breadcrumbs.value[2] = properties.value["title"][0][0];
</script>

<script lang="ts">
export default {
  name: "NotionPageHeader",
};
</script>

<template>

  <v-breadcrumbs :items="breadcrumbs"
                 density="comfortable"

  />
  <header class="notion-page-header">
    <div class="notion-nav-breadcrumbs">
    </div>
  </header>
</template>
