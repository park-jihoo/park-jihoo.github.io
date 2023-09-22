<script setup>
import { getPageTable } from "/lib/api";
import { VDataTable } from "vuetify/labs/components";

const selectedClass = ref([]);
const route = useRoute();
const router = useRouter();

const { data: pageTable } = useAsyncData("notion", async () => {
    return await getPageTable("619787c75b60479886c147cf746bfbb8");
  });


const classes = computed(() => {
  const allClasses = pageTable.value.map((post) => post.class);
  selectedClass.value = [...new Set(allClasses)].sort((a, b) =>
    a.localeCompare(b)
  )[0];
  return [...new Set(allClasses)].sort((a, b) => a.localeCompare(b));
});

const filteredTable = computed(() => {
  return pageTable.value.filter((post) =>
    selectedClass.value.includes(post.class)
  );
});

const headers = [{ title: "Title", key: "title", sortable: true }];

const navigateTo = (event, data) => {
  const link = data.item.value;
  router.push({ path: "/notes/" + link });
};

const search = ref("");
</script>

<template>
  <div>
    <v-container class="my-5">
      <v-row no-gutters class="justify-center">
        <v-col class="ma-2" align-self="start">
          <v-tabs v-model="selectedClass" center-active>
            <v-tab v-for="(classItem, index) in classes" :key="index" :value="classItem">
              <template v-slot:title>
                {{ classItem }}
              </template>
              {{ classItem }}
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
              :loading="filteredTable.length === 0 && search.length===0"
              :items-per-page="10"
            >
              <template v-slot:item.title="{ item }">
                <NuxtLink :to="`/notes/${item.selectable.id}`" style="text-decoration: none;color:inherit;">
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
<script>
export default{
  async fetch(){
    await Promise.all([pageTable.value, classes.value])
  }
}
</script>