<script setup>
</script>

<template>
  <main>
    <ContentDoc v-slot="{doc}">
      <ContentRenderer :value="doc"/>
    </ContentDoc>
  </main>
</template>

<style scoped>

</style>