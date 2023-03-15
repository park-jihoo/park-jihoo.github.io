import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../components/HomeComponent.vue";
import ItemList from "../components/ItemList.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeComponent
    },
    {
        path: "/item",
        name: "Item",
        component: ItemList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router