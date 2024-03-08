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
      props: (route) => ({ types: route.query.types }),
    },
    {
      path: "/restaurant/:slug",
      name: "restaurant",
      component: SingleRestaurant,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
});

export { router };
