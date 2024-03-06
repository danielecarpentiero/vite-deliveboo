import { createRouter, createWebHistory } from "vue-router";
import SingleRestaurant from "./pages/SingleRestaurant.vue";

import AppHome from "./pages/AppHome.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/restaurant/:slug",
      name: "restaurant",
      component: SingleRestaurant,
    },
  ],
});

export { router };
