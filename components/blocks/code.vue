<script setup lang="ts">
import Prism from "prismjs";
import { useNotionBlock, defineNotionProps } from "~/lib/blockable";
import CodeBlock from "vue3-code-block";
import { useTheme } from "vuetify";

import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-java";
import "prismjs/components/prism-js-templates";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-coffeescript";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-git";
import "prismjs/components/prism-go";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-handlebars";
import "prismjs/components/prism-json";
import "prismjs/components/prism-less";
import "prismjs/components/prism-makefile";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-objectivec";
import "prismjs/components/prism-ocaml";
import "prismjs/components/prism-python";
import "prismjs/components/prism-reason";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-stylus";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-wasm";
import "prismjs/components/prism-yaml";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import mermaid from "mermaid";

const props = defineProps({ overrideLang: String, overrideLangClass: String, ...defineNotionProps });
//@ts-ignore
const { properties } = useNotionBlock(props);
const lang = computed(() => {
  return props.overrideLang || properties.value?.language?.[0]?.[0]?.toLowerCase();
});

const langClass = computed(() => {
  return props.overrideLangClass || `language-${lang.value}`;
});

const supported = computed(() => {
  return lang.value ? Prism?.languages[lang.value] : false;
});

const computedSlot = computed(() => properties.value?.title.map((i) => i?.[0]).join(""));

mermaid.initialize({
  startOnLoad: false
});

watchEffect(async () => {
  if (lang.value === "mermaid" && process.client) {
    await mermaid.run({
      querySelector: ".mermaid"
    });
  }
});


const theme = useTheme();
</script>

<script lang="ts">
export default {
  name: "NotionCode"
};
</script>

<template>
  <div v-if="lang === 'mermaid'">
    <div class="mermaid" v-html="computedSlot"></div>
  </div>
  <div v-else-if="supported" :class="['notion-code']">
    <ClientOnly>
      <CodeBlock :code="computedSlot" :lang="lang" :class="langClass" prismjs persistent-copy-button :theme="`${theme.global.current.value.dark ? 'dark' : 'default'}`" />
    </ClientOnly>
  </div>
  <div v-else :class="['notion-code']">
    <ClientOnly>
      <CodeBlock :code="computedSlot" :class="langClass" prismjs persistent-copy-button :theme="`${theme.global.current.value.dark ? 'dark' : 'default'}`" />
    </ClientOnly>
  </div>
</template>

<style>
@use "prismjs/themes/prism-dark.css";
@use "prismjs/themes/prism.css";
</style>
