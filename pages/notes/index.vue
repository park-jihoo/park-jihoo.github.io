<script setup>

const route = useRoute();
const router = useRouter();
const { data: contents } = useAsyncData("contents", () => queryContent().only(['id', 'properties']).find())

const headers = [{ title: "Title", key: "properties.title.title[0].plain_text", sortable: true }];

const search = ref("");

const selectedTab = ref("");

const classList = computed(() => {
  const uniqueClass = new Set();
  if (contents.value) {
    contents.value.forEach((item) => {
      if(!item.properties.class.select) return;
      uniqueClass.add(item.properties.class.select.name);
    });
  }
  selectedTab.value = Array.from(uniqueClass).sort()[0];
  return Array.from(uniqueClass).sort();
});

const {data : filteredContent } = useAsyncData("filteredContent", () =>
  queryContent().where({
    'properties.class.select.name': selectedTab.value
  }).only(['id', 'properties']).find()
, { watch: selectedTab })
</script>

<template>
  <div>
    <v-container class="my-5">
      <v-row>
        <v-col class="mx-auto">
          <v-tabs v-model="selectedTab" grow>
            <v-tab v-for="(tab, index) in classList" :key="index" :value="tab">
              {{ tab }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mx-auto">
          <v-card class="pa-3 elevation-4 rounded-lg">
            <v-row class="mb-3">
              <v-col>
                <v-text-field
                  v-model="search"
                  label="Search"
                  outlined
                  dense
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="filteredContent"
                  :search="search"
                  :items-per-page="10"
                >
                  <template v-slot:item.properties.title.title[0].plain_text="{ item }">
                    <v-chip color="primary" dark class="mr-2">
                      {{ item.properties.subclass.select.name }}
                    </v-chip>
                    <NuxtLink :to="`/notes/${item.id}`">
                      <NotionRichText :richText="item.properties.title.title" />
                    </NuxtLink>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
