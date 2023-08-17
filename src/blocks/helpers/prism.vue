<script setup lang="ts">
import Prism from "prismjs"
import { computed, toRefs, useSlots } from "vue"
import CodeBlock from "vue3-code-block"
import "prismjs/themes/prism.css"

const slots = useSlots()
const props = defineProps({
  code: {
    type: String,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  language: {
    type: String,
    default: "markup",
  },
})

const { inline, language } = toRefs(props)
const className = computed(() => `language-${language.value}`)

const defaultSlot = (slots && slots.default && slots.default()) || []
const code =
  props.code || (defaultSlot && defaultSlot.length && defaultSlot[0]?.children)
    ? (defaultSlot[0].children as string)
    : ""
const d = computed(() => code)
const lang = computed(() => {
  if (language.value==="c++") return "cpp";
  else return language.value;
})
</script>

<template>
  <div :class="className" v-if="inline" v-html="d"></div>
  <CodeBlock v-else :class="className" :code="d" prismjs :lang="lang"
  />
</template>