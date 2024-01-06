<script setup>
const props = defineProps(["block"]);
</script>

<template>
  <v-table density="comfortable">
    <tbody>
      <tr v-for="tableRow in block.children.results">
        <td v-for="cell in tableRow[tableRow.type].cells">
          <NotionRichText :richText="cell" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
