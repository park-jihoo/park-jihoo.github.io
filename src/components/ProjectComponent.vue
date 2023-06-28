<script setup>
import {onMounted, ref, computed} from 'vue';
import {getPageTable} from 'vue-notion';

const pageTable = ref([]);

onMounted(async () => {
    pageTable.value = await getPageTable('619787c75b60479886c147cf746bfbb8');
});

</script>

<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="pa-5" elevation="2" outlined>
                    <v-list>
                        <v-list-item v-for="post in pageTable" :key="post.id" link
                                     :to="{ path: '/notion/' + post.id }">
                            <v-list-item-title class="font-weight-bold" v-text="post.title"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.v-list-item {
    cursor: pointer;
    transition: all 0.3s ease;
}

.v-list-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
