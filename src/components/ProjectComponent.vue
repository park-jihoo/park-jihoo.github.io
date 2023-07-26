<script setup>
import { ref, computed, onMounted } from "vue";
import { getPageTable } from "vue3-notion";
import { useRoute, useRouter } from "vue-router";
import { VDataTable } from "vuetify/labs/components";

const pageTable = ref([]);
const selectedClass = ref(["Paper"]);
const route = useRoute();
const router = useRouter();
const itemsPerPage = ref(10);

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
          multiple
        >
          <v-btn
            v-for="classItem in classes"
            :key="classItem"
            :value="classItem"
          >
            {{ classItem }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ma-2" align-self="start">
        <v-card class="pa-3 elevation-2">
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="filteredTable"
            :items-length="filteredTable.length"
            hide-default-footer
            dense
            hover
            @click:row="navigateTo"
          >
            <template v-slot:item.title="{ item }">
              <v-chip color="primary" dark class="ma-1">
                {{ item.selectable.class }}
              </v-chip>
              {{ item.selectable.title }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
