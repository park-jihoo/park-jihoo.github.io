import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../components/HomeComponent.vue";
import ItemList from "../components/ItemList.vue";
import PostComponent from "../components/PostComponent.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeComponent
    },
    {
        path: "/post/:id",
        name: "Post",
        component: PostComponent
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router