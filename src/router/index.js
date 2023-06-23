import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../components/HomeComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import ProjectComponent from "../components/ProjectComponent.vue";
import LeetCode from "../components/LeetCode.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeComponent
    },
    {
        path: "/projects",
        name: "Project",
        component: ProjectComponent
    },
    {
        path: "/projects/:id",
        name: "Post",
        component: PostComponent
    },
    {
        path: "/leetcode",
        name: "Leetcode",
        component: LeetCode
    },
    {
        path: "/home",
        name: "Home",
        component: HomeComponent
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