<script setup>
</script>

<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>My Blog</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer app>
      <v-container>
        <span>&copy; 2023 My Blog</span>
      </v-container>
    </v-footer>
  </v-app>
</template>