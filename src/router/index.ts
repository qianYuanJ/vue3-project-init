import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import("@views/home/Home.vue"),
        meta: {
            title: '首页'
        }
    },
];



const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;