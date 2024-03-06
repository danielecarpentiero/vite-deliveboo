<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <AppHeader />
  <AppFooter />
</template>

<style></style>
