<script setup>
import { useGetPageTable } from "~/lib/composables";
import { VDataTable } from "vuetify/labs/components";

const route = useRoute();
const router = useRouter();

const { data: pageTable } = useGetPageTable("619787c75b60479886c147cf746bfbb8");

const headers = [{ title: "Title", key: "title", sortable: true }];

const navigateTo = (event, data) => {
  const link = data.item.value;
  router.replace({ path: "/notes/" + link });
};

const search = ref("");

const selectedTab = ref("");

const classList = computed(() => {
  const uniqueClass = new Set();
  if (pageTable.value) {
    pageTable.value.forEach((item) => {
      uniqueClass.add(item.class);
    });
  }
  return Array.from(uniqueClass).sort((a, b) => a.localeCompare(b));
});

const filteredPageTable = computed(() => {
  if (!selectedTab.value) {
    selectedTab.value = classList.value[0];
  }
  if (pageTable.value) {
    return pageTable.value.filter((item) => {
      return item.class === selectedTab.value && item.title.toLowerCase().includes(search.value.toLowerCase());
    });
  }
  return [];
});
</script>

<template>
  <div>
    <v-container class="my-5">
      <v-row >
        <v-col class="ma-2" align-self="start">
          <v-tabs v-model="selectedTab" grow>
            <v-tab v-for="(tab, index) in classList" :key="index" :value="tab">
              {{ tab }}
            </v-tab>
          </v-tabs>
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
              clearable
              solo
              color="primary"
              placeholder="Search..."
              @click:clear="search = ''"
              class="text-body-2"
            >
              <template #prepend>
                <v-icon color="primary">mdi-magnify</v-icon>
              </template>
            </v-text-field>
            <v-data-table
              v-if="filteredPageTable"
              :headers="headers"
              :items="filteredPageTable"
              :items-length="filteredPageTable.length"
              hide-default-footer
              dense
              hover
              :search="search"
              @click:row="navigateTo"
              :loading="filteredPageTable.length===0 && search.length ===0"
              :items-per-page="10"
            >
              <template v-slot:item.title="{ item }">
                <NuxtLink :to="`/notes/${item.selectable.id}`"
                          prefetch
                          style="text-decoration: none;color:inherit;">
                  <v-chip class="mr-2 mt-2" color="primary">
                    {{ item.selectable.subclass }}
                  </v-chip>
                  <span class="font-weight-regular">{{ item.selectable.title }}</span>
                </NuxtLink>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>