<script lang="ts">
export default {
  name: "NotionTable",
}
</script>
<template>
  <div class="notion-simple-table-wrapper">
    <v-table class="notion-simple-table ma-2"
             density="compact"
             hover="true"
    >
      <tbody>
        <slot />
      </tbody>
    </v-table>
  </div>
</template>
