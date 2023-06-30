<script setup>
import {ref, computed, onMounted} from 'vue';
import {getPageTable} from 'vue-notion';
import {useRoute} from 'vue-router';

const pageTable = ref([]);
const selectedClass = ref('Paper');
const route = useRoute();

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
  <v-container fluid>
    <v-navigation-drawer permanent class="grey lighten-4 elevation-1">
      <v-list dense>
        <v-list-item v-for="className in classes" :key="className" @click="selectedClass = className">
          <v-list-item-title class="grey--text text--darken-1">{{ className }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-row no-gutters>
      <v-col align-self="auto">
        <v-card class="pa-5 elevation-1">
          <v-list two-line flat>
            <v-list-item v-for="post in filteredPageTable" :key="post.id" link
                         :to="{ path: '/notes/'+ post.id }">
              <v-list-item-title>{{ post.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
