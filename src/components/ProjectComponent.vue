<script setup>
import {ref, computed, onMounted} from 'vue';
import {getPageTable} from 'vue-notion';
import {useRoute} from 'vue-router';
import {useDisplay} from "vuetify";

const pageTable = ref([]);
const selectedClass = ref("RL Theory");
const route = useRoute();
const { mobile } = useDisplay();

onMounted(async () => {
  pageTable.value = await getPageTable('619787c75b60479886c147cf746bfbb8');
  if (route.query.class) {
    selectedClass.value = route.query.class;
  }
});

const classes = computed(() => {
  const allClasses = pageTable.value.map(post => post.class);
  return [...new Set(allClasses)];
});

const filteredPageTable = computed(() => {
  return pageTable.value.filter(post => post.class === selectedClass.value || !selectedClass.value);
});

</script>

<template>
  <v-container fluid class="my-5">
    <v-row no-gutters class="justify-center">
      <v-tabs v-model="selectedClass" background-color="transparent" class="ma-2 d-sm-none" align-self="start" grow>
        <v-tab v-for="className in classes" :key="className" :value="className" class="body-2">
          {{ className }}
        </v-tab>
      </v-tabs>
    </v-row>
    <v-row no-gutters class="justify-center">
      <v-tabs v-model="selectedClass" background-color="transparent" vertical class="ma-2 d-none d-sm-flex" align-self="start" direction="vertical">
        <v-tab v-for="className in classes" :key="className" :value="className" class="body-2">
          {{ className }}
        </v-tab>
      </v-tabs>

      <v-col class="ma-2" align-self="start">
        <v-card class="pa-2" elevation="2">
          <v-list two-line flat>
            <v-list-item v-for="post in filteredPageTable" :key="post.id" link
                         :to="{ path: '/notes/'+ post.id }">
              <v-list-item-title class="headline">{{ post.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
}

.v-card:hover {
  box-shadow: 0 10px 20px rgba(0,0,0,.19), 0 6px 6px rgba(0,0,0,.23);
}
</style>
