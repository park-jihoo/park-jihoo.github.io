<script setup lang="ts">
import { defineNotionProps, useNotionBlock } from "../../lib/blockable";
import Decorator from "../decorator.vue";
import { ref } from "vue";

const props = defineProps({ overrideLang: String, overrideLangClass: String, ...defineNotionProps });
//@ts-ignore
const { properties } = useNotionBlock(props);
</script>

<script lang="ts">
export default {
  name: "NotionPageHeader",
};
</script>

<template>
  <header class="notion-page-header">
    <div class="notion-nav-breadcrumbs">
    </div>
  </header>
</template>
