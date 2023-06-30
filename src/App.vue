<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from "vuetify";

const router = useRouter();
const theme = useTheme();

const navigateTo = (link) => {
  router.push(`/${link.toLowerCase()}`)
};

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};

const links = [
  { title: 'notes', icon: 'mdi-note-multiple' },
  { title: 'Leetcode', icon: 'mdi-code-tags' },
];
</script>



<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-toolbar-title>
        <v-avatar class="ml-4" size="40">
          <v-img src="https://avatars.githubusercontent.com/u/67787453" @click="() => navigateTo('Home')"></v-img>
        </v-avatar>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-for="link in links" :key="link.title" class="mx-2" outlined @click="() => navigateTo(link.title)">
        <v-icon left small class="mr-2">{{ link.icon }}</v-icon>
        {{ link.title }}
      </v-btn>

      <v-btn @click="toggleTheme" outlined class="mx-2">
        <v-icon left small class="mr-2">mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

