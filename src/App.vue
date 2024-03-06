<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  
};
</script>

<template>
  <div>
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style></style>
