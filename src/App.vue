<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (link) => router.push(`/${link.toLowerCase()}`);

const links = [
    'Notion',
    'Leetcode',
];
</script>

<template>
    <v-app id="inspire">
        <v-app-bar flat app color="white">
            <v-avatar class="me-10 ms-4" color="grey lighten-4" size="40">
                <v-img src="https://avatars.githubusercontent.com/u/67787453" @click="() => navigateTo('Home')"></v-img>
            </v-avatar>
            <v-btn v-for="link in links" :key="link" variant="text" @click="() => navigateTo(link)">
                {{ link }}
            </v-btn>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
.v-app-bar {
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>
