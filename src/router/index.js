import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../components/HomeComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import MindMap from "../components/MindMap.vue";

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
    },
    {
        path: "/mindmap",
        name: "Mindmap",
        component: MindMap
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router