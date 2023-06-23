<script setup>
import {ref} from 'vue'

const name = ref('Jihoo Park');
const title = ref('Web Developer');
const email = ref('wlgn8648@gmail.com');
const educationList = ref([
    {degree: 'B.S. in Mathematics', university: 'POSTECH', start: '2016', end: '2020'},
    {degree: 'M.S. in Data Science', university: 'Seoul National University', start: '2022', end: '2024'},
]);

const jobList = ref([
    {position:'Web Developer', company: 'LG CNS', start: '2020', end:'2022'}
])
</script>
<template>
  <v-list>
      <v-list-item>
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-subtitle>{{ title }}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
          <v-list-item-title>{{ email }}</v-list-item-title>
      </v-list-item>

      <v-list-item>
          <v-list-item-title>Education</v-list-item-title>
          <v-list-item-subtitle v-for="education in educationList" :key="education.degree">
              {{ education.degree }} at {{ education.university }} {{ education.start }} - {{ education.end }}
          </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
          <v-list-item-title>Job Experience</v-list-item-title>
          <v-list-item-subtitle v-for="job in jobList" :key="job.position">
              {{ job.position }} at {{ job.company }} {{ job.start }} - {{ job.end }}
          </v-list-item-subtitle>
      </v-list-item>
  </v-list>
</template>