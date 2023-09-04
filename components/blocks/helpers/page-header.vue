<script setup lang="ts">
import { useNotionBlock, defineNotionProps } from "~/lib/blockable";
import Decorator from "../decorator.vue";

const props = defineProps({ ...defineNotionProps });
const {properties} = useNotionBlock(props);
const breadcrumbs = ref(["","",""]);
for(const key in properties.value){
  if(key === "title")
    breadcrumbs.value[2] = properties.value[key][0][0];
  else if(key === "Q}G_")
    breadcrumbs.value[1] = properties.value[key][0][0];
  else if(key === "[qIJ")
    breadcrumbs.value[0] = properties.value[key][0][0];
}
</script>

<script lang="ts">
export default {
  name: "NotionPageHeader",
};
</script>

<template>
  <v-breadcrumbs :items="breadcrumbs" />
<!--  <header class="notion-page-header">-->
<!--    <div class="notion-nav-breadcrumbs">-->
<!--    </div>-->
<!--  </header>-->
</template>
