<script setup>
import { ref, computed, onMounted } from "vue";
import { getPageTable } from "vue3-notion";
import { useRoute, useRouter } from "vue-router";
import { VDataTableServer, VDataTable } from "vuetify/labs/components";

const pageTable = ref([]);
const selectedClass = ref(["Paper"]);
const route = useRoute();
const router = useRouter();

const classes = computed(() => {
  const allClasses = pageTable.value.map((post) => post.class);
  return [...new Set(allClasses)];
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

  pageTable.value.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    } else {
      return 0;
    }
  });
});

const search = ref("");

const itemsPerPageOptions = ref([10, 20, 30, 40, 50]);
</script>

<template>
  <v-container class="my-5">
    <v-row no-gutters class="justify-center">
      <v-col class="ma-2" align-self="start">
        <v-btn-toggle
          v-model="selectedClass"
          :mandatory="'force'"
          rounded="0"
          color="primary"
          density="comfortable"
          divided
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
      <v-col>
        <v-text-field
          v-model="search"
          label="Search"
          filled
          hide-details
          class="ma-1"
          clearable
          solo
          color="primary"
          placeholder="Search..."
        >
          <template #prepend>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-2" align-self="start">
        <v-card class="pa-3 elevation-4 rounded-lg">
          <v-data-table
            :headers="headers"
            :items="filteredTable"
            :items-length="filteredTable.length"
            hide-default-footer
            dense
            hover
            :search="search"
            @click:row="navigateTo"
            :loading="filteredTable.length===0"
            :items-per-page="10"
          >
            <template #item.title="{ item }">
              <v-icon class="mr-2" icon="mdi-file-document-outline"></v-icon>
              {{ item.selectable.title }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
