<script setup>
import VueMermaidString from 'vue-mermaid-string'
import endent from 'endent'

const diagram = endent`
    graph TD
    A[Client] --> B[Load Balancer]
    B --> C[Server1]
    B --> D[Server2]
`
</script>

<template>
  <vue-mermaid-string :value="diagram"/>
</template>