<script setup>

const name = "Jihoo Park";
const title = "Data Scientist";
const email = "wlgn8648@gmail.com";
const educationList = ref([
  {
    degree: "B.S. in Mathematics",
    university: "POSTECH",
    start: "2016",
    end: "2020",
  },
  {
    degree: "M.S. in Data Science",
    university: "Seoul National University",
    start: "2022",
    end: "2024",
  },
]);

const jobList = ref([
  { position: "Web Developer", company: "LG CNS", start: "2020", end: "2022" },
]);

const links = computed(() => [
  { icon: "mdi-github", url: "https://github.com/park-jihoo" },
  { icon: "mdi-linkedin", url: "https://www.linkedin.com/in/parkjihoo/" },
  { icon: "mdi-email", url: `mailto:${email}` },
]);

const skills = ref({
  ML: ["tensorflow", "pytorch"],
  DB: ["mysql", "postgres", "sqlite", "kafka", "mongodb"],
  BE: ["spring", "django", "fastapi", "flask"],
  FE: ["vue", "react", "html", "css", "md", "vite"],
  cloud: ["gcp", "aws"],
  devops: ["jenkins", "docker", "githubactions", "git"],
  languages: ["py", "cpp", "c", "java", "r", "js", "matlab", "latex"],
  ides: ["vscode", "idea", "eclipse"],
});

const goTo = (url) => {
  window.open(url, "_blank");
};
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col align-self="auto">
        <v-card class="mb-6">
          <v-card-title>{{ name }}</v-card-title>
          <v-card-subtitle class="mb-2 text-button">{{
              title
            }}</v-card-subtitle>
          <v-card-actions class="ml-2">
            <v-icon
                medium
                class="mr-2"
                v-for="link in links"
                :key="link.icon"
                @click="goTo(link.url)"
            >
              {{ link.icon }}
            </v-icon>
          </v-card-actions>

          <v-divider class="my-2" />

          <v-card-title>SKILLS</v-card-title>
          <v-card-text class="text-button">
            <div v-for="(skillset, category) in skills" :key="category">
              <div class="mb-2">{{ category }}</div>
              <v-img
                  :src="`https://skillicons.dev/icons?i=${skillset.join()}&theme=light`"
                  :max-width="`${70 * skillset.length}px`"
                  class="my-2"
              />
            </div>
          </v-card-text>
          <v-divider class="my-2" />
          <v-card-title>EDUCATION</v-card-title>
          <v-card-text>
            <div v-for="education in educationList" :key="education.degree">
              {{ education.degree }} at {{ education.university }} ({{
                education.start
              }}
              - {{ education.end }})
            </div>
          </v-card-text>

          <v-divider class="my-2" />

          <v-card-title>JOB EXPERIENCE</v-card-title>
          <v-card-text>
            <div v-for="job in jobList" :key="job.position">
              {{ job.position }} at {{ job.company }} ({{ job.start }} -
              {{ job.end }})
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>