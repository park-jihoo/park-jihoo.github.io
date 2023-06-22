import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../components/HomeComponent.vue";
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
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: HomeComponent
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

export default router