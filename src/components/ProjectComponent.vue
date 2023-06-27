<script setup>
import {onMounted, ref, computed} from 'vue'
import {getPageTable} from 'vue-notion'

const pageTable = ref('');

onMounted(async () => {
    pageTable.value = await getPageTable("619787c75b60479886c147cf746bfbb8");
});

const page = ref(1);
const postsPerPage = 10;
const paginatedTable = computed(() => {
    const start = (page.value - 1) * postsPerPage;
    const end = page.value * postsPerPage;
    return pageTable.value.slice(start, end);
});

const totalPage = computed(() => {
    return Math.ceil(pageTable.value.length / postsPerPage);
});

</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <v-sheet min-height="70vh" rounded="lg">
                    <v-list>
                        <v-list-item v-for="post in paginatedTable"
                                     :key="post.id" link
                                     :to="{path:'/til/' + post.id}">
                            <v-list-item-title v-text="post.title"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                    <v-pagination
                        v-model="page"
                        :length="totalPage"
                        circle
                        background-color="white"
                        />
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>