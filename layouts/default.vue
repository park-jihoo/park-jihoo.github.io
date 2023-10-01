<script setup>
import { useTheme } from "vuetify";

const router = useRouter();
const theme = useTheme();
const drawer = ref(false);

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

const links = [
  { title: "notes", icon: "mdi-note-multiple" },
  { title: "algorithm", icon: "mdi-code-tags" }
];

</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item
          class="py-0"
          v-for="link in links"
          :key="link.title"
        >
          <NuxtLink :to="'/'+`${link.title.toLowerCase()}`" style="text-decoration: none;color:inherit;">
            <v-list-item-title
              :class="
              $vuetify.theme.global.current.dark
                ? 'text-button text-deep-purple-lighten-2'
                : 'text-button text-deep-purple-darken-2'
            "
            >
              <v-icon left small class="mr-2" color="primary">{{
                  link.icon
                }}
              </v-icon>
              {{ link.title }}
            </v-list-item-title>
          </NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat>
      <v-app-bar-title>
        <v-avatar class="ml-4" size="40">
          <v-img
            src="https://avatars.githubusercontent.com/u/67787453"
            @click="() => navigateTo('')"
          ></v-img>
        </v-avatar>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
        class="mx-2 d-none d-sm-flex"
        v-for="link in links"
        :key="link.title"
        text
        color="primary"
      >
        <NuxtLink :to="'/'+`${link.title.toLowerCase()}`" style="text-decoration: none;color:inherit;">
          <v-icon left small class="mr-2">{{ link.icon }}</v-icon>
          {{ link.title }}
        </NuxtLink>
      </v-btn>

      <v-btn @click="toggleTheme" outlined class="mx-2" color="primary">
        <v-icon left small class="mr-2">mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="d-sm-none"
        color="primary"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main app>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  layout: "default"
};
</script>

<style scoped>

</style>