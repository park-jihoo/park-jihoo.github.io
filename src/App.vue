<script setup>
import { useRouter } from 'vue-router';
import MindMap from "./components/MindMap.vue";
const router = useRouter();
function home(){
    router.push({name: 'Home'});
};
</script>

<template>
    <v-app>
        <v-app-bar dense app color="primary" dark>
            <v-app-bar-title>
                <v-toolbar-title @click="home">Jihoo Park</v-toolbar-title>
            </v-app-bar-title>
        </v-app-bar>

        <v-main>
            <MindMap/>
<!--            <router-view></router-view>-->
        </v-main>

        <v-footer app color="primary" dark absolute>
            <v-spacer></v-spacer>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>
