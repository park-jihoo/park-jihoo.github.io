<script setup>
import { ref, computed, onMounted } from "vue";
import { getPageTable } from "vue3-notion";
import { useRoute, useRouter } from "vue-router";
import { VDataTable } from "vuetify/labs/components";

const pageTable = ref([]);
const selectedClass = ref([]);
const route = useRoute();
const router = useRouter();

const classes = computed(() => {
  const allClasses = pageTable.value.map((post) => post.class);
  selectedClass.value = [...new Set(allClasses)].sort((a, b) =>
    a.localeCompare(b),
  )[0];
  return [...new Set(allClasses)].sort((a, b) => a.localeCompare(b));
});

const filteredTable = computed(() => {
  return pageTable.value.filter((post) =>
    selectedClass.value.includes(post.class),
  );
});

const headers = [{ title: "Title", key: "title", sortable: true }];

const navigateTo = (event, data) => {
  const link = data.item.value;
  router.push({ path: "/notes/" + link });
};

onMounted(async () => {
  pageTable.value = await getPageTable("619787c75b60479886c147cf746bfbb8");
  if (route.query.class) {
    selectedClass.value = route.query.class;
  }

  pageTable.value.sort((a, b) => a.title.localeCompare(b.title));
});

const search = ref("");
</script>

<template>
  <v-container class="my-5">
    <v-row no-gutters class="justify-center">
      <v-col class="ma-2" align-self="start">
        <v-btn-toggle
          v-model="selectedClass"
          :mandatory="'force'"
          rounded
          color="primary"
          dense
          group
        >
          <v-btn
            v-for="classItem in classes"
            :key="classItem"
            :value="classItem"
            outlined
          >
            {{ classItem }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-2" align-self="start">
        <v-card class="pa-3 elevation-4 rounded-lg">
          <v-text-field
            v-model="search"
            label="Search"
            filled
            hide-details
            class="ma-1"
            clearable
            @click:clear="search = ''"
            solo
            color="primary"
            placeholder="Search..."
          >
            <template #prepend>
              <v-icon color="primary">mdi-magnify</v-icon>
            </template>
          </v-text-field>
          <v-data-table
            :headers="headers"
            :items="filteredTable"
            :items-length="filteredTable.length"
            hide-default-footer
            dense
            hover
            :search="search"
            @click:row="navigateTo"
            :loading="filteredTable.length === 0"
            :items-per-page="10"
          >
            <template v-slot:item.title="{ item }">
              <v-icon v-if="item.selectable.pdf" class="mr-2" color="primary">mdi-file-document-outline</v-icon>
              <v-icon v-else class="mr-2" color="primary">mdi-file-outline</v-icon>
              <span class="font-weight-regular">{{ item.selectable.title }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>