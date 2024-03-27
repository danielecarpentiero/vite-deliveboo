<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    AppHeader,
    RouterView,
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

<style scoped lang="scss">
.content {
  //overflow-x: hidden;
}
</style>
