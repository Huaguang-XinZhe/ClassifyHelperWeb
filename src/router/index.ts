/** @format */

import { createRouter, createWebHistory } from "vue-router";
import StartView from "@/views/StartView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "start",
      component: StartView,
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/MainView.vue"),
    },
  ],
});

export default router;
