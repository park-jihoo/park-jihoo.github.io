<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();

function navigateTo(link) {
    router.push(`/${link.toLowerCase()}`);
}

const links = [
    'Notion',
    'Leetcode',
];
</script>

<template>
    <v-app id="inspire">
        <v-app-bar flat app>
            <v-container class="fill-height d-flex align-center">
                <v-avatar class="me-10 ms-4" color="grey lighten-4" size="40">
                    <v-img src="https://avatars.githubusercontent.com/u/67787453" @click="navigateTo('Home')"></v-img>
                </v-avatar>
                <v-btn v-for="link in links" :key="link" variant="text" @click="navigateTo(link)">
                    {{ link }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-responsive max-width="260">
                    <v-text-field
                            density="compact"
                            hide-details
                            variant="solo"
                    ></v-text-field>
                </v-responsive>
            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row>
                    <v-col>
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
