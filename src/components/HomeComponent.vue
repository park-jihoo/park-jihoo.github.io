<script setup>
import {ref, computed} from 'vue'

const name = 'Jihoo Park';
const title = 'Data Scientist';
const email = 'wlgn8648@gmail.com';
const educationList = ref([
  {degree: 'B.S. in Mathematics', university: 'POSTECH', start: '2016', end: '2020'},
  {degree: 'M.S. in Data Science', university: 'Seoul National University', start: '2022', end: '2024'},
]);

const jobList = ref([
  {position: 'Web Developer', company: 'LG CNS', start: '2020', end: '2022'}
])

const links = computed(() => [
  {icon: 'mdi-github', url: 'https://github.com/park-jihoo'},
  {icon: 'mdi-linkedin', url: 'https://www.linkedin.com/in/parkjihoo/'},
  {icon: 'mdi-email', url: `mailto:${email}`},
]);

const skills = ref({
  ML: ['tensorflow', 'pytorch'],
  DB: ['mysql', 'postgres', 'sqlite', 'kafka', 'mongodb'],
  BE: ['spring', 'django', 'fastapi', 'flask',],
  FE: ['vue', 'react', 'html', 'css', 'md', 'vite',],
  cloud: ['gcp', 'aws',],
  devops: ['jenkins', 'docker', 'githubactions', 'git',],
  languages: ['py', 'cpp', 'c', 'java', 'r', 'js', 'matlab', 'latex'],
  ides: ['vscode', 'idea', 'eclipse']
});

const goTo = (url) => {
  window.open(url, '_blank');
}
</script>

<template>
  <v-container fluid>
    <v-card class="pa-5">
      <v-list>
        <v-list-item>
          <v-list-item-title class="headline">{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ title }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item class="mt-2">
          <v-icon small class="mr-2"
                  v-for="link in links"
                  :key="link.icon"
                  @click="goTo(link.url)">
            {{ link.icon }}
          </v-icon>
        </v-list-item>

        <v-list-item class="mt-2">
          <v-list-item-title class="overline">Skills</v-list-item-title>
          <div v-for="(skillset, category) in skills" :key="category">
            <v-list-item-subtitle class="mt-2">
              {{ category }}
            </v-list-item-subtitle>
            <v-img
                  :src="`https://skillicons.dev/icons?i=${skillset.join()}&theme=light`"
                  :max-width="`${60*skillset.length - 10}px`"
            />
          </div>
        </v-list-item>

        <v-list-item class="mt-4">
          <v-list-item-title class="overline">Education</v-list-item-title>
          <v-list-item-subtitle v-for="education in educationList" :key="education.degree">
            {{ education.degree }} at {{ education.university }} ({{ education.start }} - {{ education.end }})
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="mt-4">
          <v-list-item-title class="overline">Job Experience</v-list-item-title>
          <v-list-item-subtitle v-for="job in jobList" :key="job.position">
            {{ job.position }} at {{ job.company }} ({{ job.start }} - {{ job.end }})
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  margin: auto;
}

.headline {
  font-size: 1.5rem;
}

.overline {
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.6);
}

</style>
