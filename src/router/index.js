import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../components/HomeComponent.vue";
import PostComponent from "../components/PostComponent.vue";
import ProjectComponent from "../components/ProjectComponent.vue";
import LeetCode from "../components/LeetcodeComponent.vue";
import CodeComponent from "../components/CodeComponent.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeComponent
    },
    {
        path: "/notion",
        name: "Project",
        component: ProjectComponent
    },
    {
        path: "/notion/:id",
        name: "Post",
        component: PostComponent
    },
    {
        path: "/leetcode",
        name: "Leetcode",
        component: LeetCode
    },
    {
        path: "/leetcode/:slug/:file",
        name: "codes",
        component: CodeComponent
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